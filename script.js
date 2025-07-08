// Configurações
const YOUTUBE_CHANNEL_URL = 'https://youtube.com/@edunetpescaaventura?si=VcpQ8xUXb5pDCJf4';

// Função para calcular a fase da lua
function getMoonPhase(date = new Date()) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    const day = date.getDate();
    
    // Algoritmo para calcular a fase da lua baseado na data juliana
    let c, e, jd, b;
    
    if (month < 3) {
        year--;
        month += 12;
    }
    
    ++month;
    c = 365.25 * year;
    e = 30.6 * month;
    jd = c + e + day - 694039.09; // Data juliana
    jd /= 29.5305882; // Período lunar
    b = parseInt(jd);
    jd -= b;
    b = Math.round(jd * 8);
    
    if (b >= 8) {
        b = 0;
    }
    
    const phases = [
        { name: 'Lua Nova', icon: '🌑', description: 'Ideal para pesca noturna' },
        { name: 'Lua Crescente', icon: '🌒', description: 'Boa para pesca matinal' },
        { name: 'Quarto Crescente', icon: '🌓', description: 'Excelente para pesca' },
        { name: 'Gibosa Crescente', icon: '🌔', description: 'Muito boa para pesca' },
        { name: 'Lua Cheia', icon: '🌕', description: 'Perfeita para pesca noturna' },
        { name: 'Gibosa Minguante', icon: '🌖', description: 'Boa para pesca' },
        { name: 'Quarto Minguante', icon: '🌗', description: 'Regular para pesca' },
        { name: 'Lua Minguante', icon: '🌘', description: 'Melhor durante o dia' }
    ];
    
    return phases[b];
}

// Função para obter dados de maré simulados (baseados em dados reais de Santos)
function getTideData() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    
    // Simulação baseada em padrões reais de maré de Santos
    const tides = [];
    const baseTime = new Date(today);
    baseTime.setHours(0, 0, 0, 0);
    
    // Padrão típico de marés em Santos (2 altas e 2 baixas por dia)
    const tidePattern = [
        { type: 'alta', hour: 1, minute: 30, height: 1.3 },
        { type: 'baixa', hour: 7, minute: 45, height: 0.4 },
        { type: 'alta', hour: 14, minute: 15, height: 1.5 },
        { type: 'baixa', hour: 20, minute: 30, height: 0.3 }
    ];
    
    // Adiciona variação baseada no dia do ano para simular ciclos lunares
    const lunarVariation = Math.sin((dayOfYear / 29.5) * 2 * Math.PI) * 0.2;
    
    tidePattern.forEach(tide => {
        const tideTime = new Date(baseTime);
        tideTime.setHours(tide.hour, tide.minute);
        
        // Adiciona pequena variação diária
        const variation = (Math.sin(dayOfYear * 0.1) * 30) + (Math.random() * 20 - 10);
        tideTime.setMinutes(tideTime.getMinutes() + variation);
        
        tides.push({
            type: tide.type,
            time: tideTime,
            height: (tide.height + lunarVariation + (Math.random() * 0.2 - 0.1)).toFixed(1)
        });
    });
    
    return tides.sort((a, b) => a.time - b.time);
}

// Função para formatar data
function formatDate(date) {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'America/Sao_Paulo'
    };
    return date.toLocaleDateString('pt-BR', options);
}

// Função para formatar hora
function formatTime(date) {
    return date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Sao_Paulo'
    });
}

// Função para determinar a próxima maré
function getNextTide(tides) {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    for (let tide of tides) {
        if (tide.time > now) {
            return tide;
        }
    }
    
    // Se não há mais marés hoje, retorna a primeira de amanhã
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowTides = getTideData();
    return tomorrowTides[0];
}

// Função para renderizar dados de maré
function renderTideData() {
    const tideContainer = document.getElementById('tide-info');
    const tides = getTideData();
    const nextTide = getNextTide(tides);
    
    let html = `
        <div class="next-tide">
            <h3>🌊 Próxima Maré</h3>
            <div class="next-tide-info">
                <span class="tide-type">${nextTide.type.toUpperCase()}</span>
                <span class="tide-time">${formatTime(nextTide.time)}</span>
                <span class="tide-height">${nextTide.height}m</span>
            </div>
        </div>
        
        <h3>📅 Marés de Hoje - Santos/SP</h3>
        <div class="tide-table">
    `;
    
    tides.forEach(tide => {
        const isNext = tide === nextTide;
        const tideClass = isNext ? 'tide-item next' : 'tide-item';
        const icon = tide.type === 'alta' ? '⬆️' : '⬇️';
        
        html += `
            <div class="${tideClass}">
                <h4>${icon} Maré ${tide.type.charAt(0).toUpperCase() + tide.type.slice(1)}</h4>
                <div class="time">${formatTime(tide.time)}</div>
                <div class="height">${tide.height} metros</div>
                ${isNext ? '<div class="next-indicator">PRÓXIMA</div>' : ''}
            </div>
        `;
    });
    
    html += '</div>';
    tideContainer.innerHTML = html;
}

// Função para atualizar a data atual
function updateCurrentDate() {
    const dateElement = document.getElementById('current-date');
    const now = new Date();
    dateElement.textContent = formatDate(now);
}

// Função para atualizar a fase da lua
function updateMoonPhase() {
    const moonTextElement = document.getElementById('moon-text');
    const moonImageElement = document.getElementById('moon-image');
    
    const moonPhase = getMoonPhase();
    
    moonTextElement.innerHTML = `
        <div class="moon-info">
            <div class="moon-icon">${moonPhase.icon}</div>
            <div class="moon-name">${moonPhase.name}</div>
            <div class="moon-description">${moonPhase.description}</div>
        </div>
    `;
}

// Função para configurar o link do YouTube
function setupYouTubeLink() {
    const youtubeLink = document.getElementById('youtube-link');
    youtubeLink.href = YOUTUBE_CHANNEL_URL;
}

// Função para adicionar efeitos de scroll suave
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Função para adicionar animações quando elementos entram na viewport
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observa elementos que devem ser animados
    document.querySelectorAll('.card, .tide-item, .fishing-tips').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// Função para atualizar dados periodicamente
function setupPeriodicUpdates() {
    // Atualiza a data a cada minuto
    setInterval(updateCurrentDate, 60000);
    
    // Atualiza dados de maré a cada 5 minutos
    setInterval(renderTideData, 300000);
}

// Função para adicionar estilos CSS dinâmicos
function addDynamicStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .next-tide {
            background: linear-gradient(135deg, #4ecdc4, #44a08d);
            color: white;
            padding: 1.5rem;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 2rem;
        }
        
        .next-tide h3 {
            margin-bottom: 1rem;
            font-size: 1.3rem;
        }
        
        .next-tide-info {
            display: flex;
            justify-content: space-around;
            align-items: center;
            flex-wrap: wrap;
            gap: 1rem;
        }
        
        .tide-type {
            background: rgba(255, 255, 255, 0.2);
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: bold;
        }
        
        .tide-time {
            font-size: 1.5rem;
            font-weight: bold;
        }
        
        .tide-height {
            background: rgba(255, 255, 255, 0.2);
            padding: 0.5rem 1rem;
            border-radius: 20px;
        }
        
        .tide-item.next {
            background: linear-gradient(135deg, #ff6b6b, #ee5a24);
            position: relative;
            overflow: hidden;
        }
        
        .next-indicator {
            position: absolute;
            top: 10px;
            right: 10px;
            background: rgba(255, 255, 255, 0.9);
            color: #ee5a24;
            padding: 0.3rem 0.8rem;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: bold;
        }
        
        .moon-info {
            text-align: center;
        }
        
        .moon-icon {
            font-size: 3rem;
            margin-bottom: 0.5rem;
        }
        
        .moon-name {
            font-weight: bold;
            font-size: 1.1rem;
            margin-bottom: 0.5rem;
        }
        
        .moon-description {
            font-size: 0.9rem;
            color: #666;
            font-style: italic;
        }
        
        @media (max-width: 768px) {
            .next-tide-info {
                flex-direction: column;
            }
            
            .tide-time {
                font-size: 1.3rem;
            }
        }
    `;
    document.head.appendChild(style);
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('🐟 EduNet Pesca e Aventura - Inicializando...');
    
    // Adiciona estilos dinâmicos
    addDynamicStyles();
    
    // Atualiza informações iniciais
    updateCurrentDate();
    updateMoonPhase();
    renderTideData();
    setupYouTubeLink();
    
    // Configura funcionalidades
    setupSmoothScroll();
    setupScrollAnimations();
    setupPeriodicUpdates();
    
    console.log('✅ Site carregado com sucesso!');
    
    // Remove loading e mostra conteúdo
    setTimeout(() => {
        document.querySelectorAll('.loading').forEach(el => {
            el.style.display = 'none';
        });
    }, 1000);
});

// Função para mostrar informações de debug (pode ser removida em produção)
function showDebugInfo() {
    console.log('🌙 Fase da Lua:', getMoonPhase());
    console.log('🌊 Dados de Maré:', getTideData());
    console.log('📅 Data Atual:', formatDate(new Date()));
}

// Chama debug info se estiver em desenvolvimento
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    setTimeout(showDebugInfo, 2000);
}

