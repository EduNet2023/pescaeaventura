console.log("Script.js carregado.");
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
        { name: 'Lua Nova', icon: 'moon-new.png', description: 'Ideal para pesca noturna' },
        { name: 'Lua Crescente', icon: 'moon-waxing-crescent.png', description: 'Boa para pesca matinal' },
        { name: 'Quarto Crescente', icon: 'moon-first-quarter.png', description: 'Excelente para pesca' },
        { name: 'Gibosa Crescente', icon: 'moon-waxing-gibbous.png', description: 'Muito boa para pesca' },
        { name: 'Lua Cheia', icon: 'moon-full.png', description: 'Perfeita para pesca noturna' },
        { name: 'Gibosa Minguante', icon: 'moon-waning-gibbous.png', description: 'Boa para pesca' },
        { name: 'Quarto Minguante', icon: 'moon-last-quarter.png', description: 'Regular para pesca' },
        { name: 'Lua Minguante', icon: 'moon-waning-crescent.png', description: 'Melhor durante o dia' }
    ];
    
    return phases[b];
}

// Função para calcular a próxima fase da lua
function getNextMoonPhase(currentPhase) {
    const phases = [
        'Lua Nova', 'Lua Crescente', 'Quarto Crescente', 'Gibosa Crescente',
        'Lua Cheia', 'Gibosa Minguante', 'Quarto Minguante', 'Lua Minguante'
    ];
    
    const currentIndex = phases.indexOf(currentPhase.name);
    const nextIndex = (currentIndex + 1) % phases.length;
    const nextPhaseName = phases[nextIndex];
    
    // Calcular data aproximada da próxima fase (aproximadamente 3.7 dias entre fases)
    const today = new Date();
    const nextPhaseDate = new Date(today.getTime() + (3.7 * 24 * 60 * 60 * 1000));
    const daysUntilNext = Math.ceil((nextPhaseDate - today) / (1000 * 60 * 60 * 24));
    
    return {
        name: nextPhaseName,
        date: nextPhaseDate.toLocaleDateString('pt-BR'),
        daysUntil: daysUntilNext
    };
}

// Função para obter dados de maré simulados (baseados em dados reais de Santos)
function getTideData() {
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
    
    // Simulação baseada em padrões reais de Santos/SP
    const baseHour = 6; // Primeira maré alta do dia
    const tideInterval = 6.2; // Intervalo aproximado entre marés (6h 12min)
    
    const tides = [];
    for (let i = 0; i < 4; i++) {
        const hour = (baseHour + (i * tideInterval) + (dayOfYear * 0.8)) % 24;
        const minute = Math.floor((hour % 1) * 60);
        const hourInt = Math.floor(hour);
        
        const isHigh = i % 2 === 0;
        const height = isHigh ? 
            (1.2 + Math.sin(dayOfYear * 0.1) * 0.3).toFixed(1) : 
            (0.3 + Math.sin(dayOfYear * 0.1) * 0.2).toFixed(1);
        
        tides.push({
            time: `${hourInt.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`,
            type: isHigh ? 'alta' : 'baixa',
            height: height,
            timestamp: new Date(today.getFullYear(), today.getMonth(), today.getDate(), hourInt, minute)
        });
    }
    
    // Ordenar por horário
    tides.sort((a, b) => a.timestamp - b.timestamp);
    
    return tides;
}

// Função para encontrar a próxima maré
function getNextTide(tides) {
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    for (let tide of tides) {
        const tideTime = parseInt(tide.time.split(':')[0]) * 60 + parseInt(tide.time.split(':')[1]);
        if (tideTime > currentTime) {
            return tide;
        }
    }
    
    // Se não encontrou nenhuma maré hoje, retorna a primeira de amanhã
    const tomorrow = new Date(now);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowTides = getTideData();
    return tomorrowTides[0];
}

// Função para atualizar a data atual
function updateCurrentDate() {
    const now = new Date();
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    const dateString = now.toLocaleDateString('pt-BR', options);
    
    const dateElement = document.getElementById('current-date');
    if (dateElement) {
        dateElement.textContent = dateString;
    }
}

// Função para atualizar a fase da lua
function updateMoonPhase() {
    const currentPhase = getMoonPhase();
    const nextPhase = getNextMoonPhase(currentPhase);
    
    const moonTextElement = document.getElementById('moon-text');
    const moonImageElement = document.getElementById('moon-image');
    
    if (moonTextElement) {
        moonTextElement.innerHTML = `
            <strong>${currentPhase.name}</strong>
            <div class="moon-description">${currentPhase.description}</div>
            <div class="next-moon">
                <h4>Próxima Fase:</h4>
                <p><strong>${nextPhase.name}</strong></p>
                <p>Data: ${nextPhase.date}</p>
                <p>Em ${nextPhase.daysUntil} dias</p>
            </div>
        `;
    }
    
    if (moonImageElement) {
        moonImageElement.style.display = 'block';
        moonImageElement.innerHTML = `<img src="${currentPhase.icon}" alt="${currentPhase.name}" style="width: 80px; height: 80px; filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.5));">`;
    }
}

// Função para renderizar dados de maré
function renderTideData() {
    const tides = getTideData();
    const nextTide = getNextTide(tides);
    
    const tideContainer = document.getElementById('tide-info');
    if (!tideContainer) return;
    
    let html = `
        <div class="next-tide">
            <h3>Próxima Maré</h3>
            <div class="tide-type ${nextTide.type}">${nextTide.type.toUpperCase()}</div>
            <div class="tide-time">${nextTide.time}</div>
            <div class="tide-height">${nextTide.height}m</div>
        </div>
        
        <h3 style="text-align: center; margin: 2rem 0 1rem; color: #2c5aa0;">
            <i class="fas fa-clock"></i> Tábua Completa de Hoje
        </h3>
        <div class="tide-list">
    `;
    
    tides.forEach(tide => {
        html += `
            <div class="tide-item ${tide.type}">
                <h4>Maré ${tide.type === 'alta' ? 'Alta' : 'Baixa'}</h4>
                <div class="time">${tide.time}</div>
                <div class="height">${tide.height}m</div>
            </div>
        `;
    });
    
    html += '</div>';
    tideContainer.innerHTML = html;
}

// Função para configurar o link do YouTube
function setupYouTubeLink() {
    const youtubeLink = document.getElementById('youtube-link');
    if (youtubeLink) {
        youtubeLink.href = YOUTUBE_CHANNEL_URL;
    }
}

// Função para gerenciar contador de visitas aprimorado
function initVisitorCounter() {
    const today = new Date().toDateString();
    const visitorData = JSON.parse(localStorage.getItem('edunet_visitor_data')) || {
        totalVisits: 0,
        dailyVisits: {},
        firstVisit: today,
        lastVisit: today,
        uniqueVisitors: 0
    };

    // Verificar se é uma nova visita hoje
    if (!visitorData.dailyVisits[today]) {
        visitorData.dailyVisits[today] = 0;
        visitorData.uniqueVisitors++;
    }

    // Incrementar contadores
    visitorData.totalVisits++;
    visitorData.dailyVisits[today]++;
    visitorData.lastVisit = today;

    // Salvar dados atualizados
    localStorage.setItem('edunet_visitor_data', JSON.stringify(visitorData));

    // Atualizar display
    updateVisitorDisplay(visitorData);
}

function updateVisitorDisplay(data) {
    const today = new Date().toDateString();
    const todayVisits = data.dailyVisits[today] || 0;
    const onlineVisitors = Math.floor(Math.random() * 8) + 3;

    // Atualizar contador principal
    const visitorCountElement = document.getElementById('visitor-count');
    if (visitorCountElement) {
        animateCounter(visitorCountElement, data.totalVisits);
    }

    // Criar seção de estatísticas detalhadas
    const visitorCounter = document.querySelector('.visitor-counter');
    if (visitorCounter && !document.querySelector('.visitor-stats')) {
        const statsHTML = `
            <h3><i class="fas fa-chart-line"></i> Estatísticas de Visitas</h3>
            <div class="visitor-stats">
                <div class="stat-item">
                    <span class="stat-number" id="total-visits">${data.totalVisits}</span>
                    <span class="stat-label">Total</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" id="today-visits">${todayVisits}</span>
                    <span class="stat-label">Hoje</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" id="unique-visitors">${data.uniqueVisitors}</span>
                    <span class="stat-label">Únicos</span>
                </div>
                <div class="stat-item">
                    <span class="stat-number" id="online-visitors">${onlineVisitors}</span>
                    <span class="stat-label">Online</span>
                </div>
            </div>
            <p><i class="fas fa-eye"></i> Visitantes: <span id="visitor-count">${data.totalVisits}</span></p>
            <p style="font-size: 0.9rem; opacity: 0.8; margin-top: 0.5rem;">
                <i class="fas fa-calendar"></i> Primeira visita: ${formatDate(data.firstVisit)}
            </p>
        `;
        visitorCounter.innerHTML = statsHTML;
    }

    // Atualizar visitantes online periodicamente
    setInterval(() => {
        const newOnlineCount = Math.floor(Math.random() * 8) + 3;
        const onlineElement = document.getElementById('online-visitors');
        if (onlineElement) {
            animateCounter(onlineElement, newOnlineCount);
        }
    }, 30000);
}

function animateCounter(element, targetValue) {
    const startValue = parseInt(element.textContent) || 0;
    const duration = 1000;
    const startTime = performance.now();

    function updateCounter(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(startValue + (targetValue - startValue) * easeOutQuart);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = targetValue;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Função para configurar navegação suave
function setupSmoothScrolling() {
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

// Função para obter estatísticas (para debug)
function getVisitorStats() {
    return JSON.parse(localStorage.getItem('edunet_visitor_data'));
}

// Função para resetar contador (para desenvolvimento)
function resetVisitorCounter() {
    localStorage.removeItem('edunet_visitor_data');
    console.log('Contador de visitas resetado!');
    location.reload();
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado, inicializando funcionalidades...');
    
    // Inicializar todas as funcionalidades
    updateCurrentDate();
    updateMoonPhase();
    renderTideData();
    setupYouTubeLink();
    initVisitorCounter();
    setupSmoothScrolling();
    setupScrollAnimations();
    setupPeriodicUpdates();
    
    console.log('Todas as funcionalidades inicializadas com sucesso!');
});


// Coordenadas de Cananéia-SP
const CANANEIA_COORDS = {
    lat: -25.0147,
    lon: -47.9267
};

// Função para buscar dados climáticos de Cananéia
async function fetchWeatherData() {
    try {
        // Usando HG Brasil Weather API (gratuita)
        const weatherResponse = await fetch(`https://api.hgbrasil.com/weather?city_name=Cananéia,SP&format=json-cors`);
        
        if (!weatherResponse.ok) {
            throw new Error('Erro ao buscar dados meteorológicos');
        }
        
        const weatherData = await weatherResponse.json();
        
        if (weatherData.results) {
            updateWeatherDisplay(weatherData.results);
        }
        
        // Buscar temperatura da água usando Open-Meteo Marine API
        await fetchSeaTemperature();
        
    } catch (error) {
        console.error('Erro ao buscar dados climáticos:', error);
        showWeatherError();
    }
}

// Função para buscar temperatura da água do mar
async function fetchSeaTemperature() {
    try {
        const seaResponse = await fetch(
            `https://marine-api.open-meteo.com/v1/marine?latitude=${CANANEIA_COORDS.lat}&longitude=${CANANEIA_COORDS.lon}&hourly=sea_surface_temperature&timezone=America/Sao_Paulo&forecast_days=1`
        );
        
        if (!seaResponse.ok) {
            throw new Error('Erro ao buscar temperatura da água');
        }
        
        const seaData = await seaResponse.json();
        
        if (seaData.hourly && seaData.hourly.sea_surface_temperature) {
            // Pegar a temperatura mais recente
            const currentTemp = seaData.hourly.sea_surface_temperature[0];
            updateSeaTemperature(currentTemp);
        }
        
    } catch (error) {
        console.error('Erro ao buscar temperatura da água:', error);
        document.getElementById('water-temperature').textContent = 'N/D';
    }
}

// Função para atualizar a exibição dos dados climáticos
function updateWeatherDisplay(data) {
    // Temperatura
    document.getElementById('temperature').textContent = `${data.temp}°C`;
    
    // Pressão atmosférica (simulada baseada em dados típicos)
    const pressure = Math.round(1013 + (Math.random() - 0.5) * 20);
    document.getElementById('pressure').textContent = `${pressure} hPa`;
    
    // Umidade
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    
    // Vento
    document.getElementById('wind-speed').textContent = data.wind_speedy;
    document.getElementById('wind-direction').textContent = `Direção: ${data.wind_cardinal || 'N/D'}`;
    
    // Condição climática
    document.getElementById('weather-condition').textContent = data.description;
    document.getElementById('weather-description').textContent = `Atualizado: ${data.time}`;
}

// Função para atualizar temperatura da água
function updateSeaTemperature(temperature) {
    if (temperature !== null && temperature !== undefined) {
        document.getElementById('water-temperature').textContent = `${Math.round(temperature)}°C`;
    } else {
        document.getElementById('water-temperature').textContent = 'N/D';
    }
}

// Função para exibir erro nos dados climáticos
function showWeatherError() {
    const weatherCards = document.querySelectorAll('.weather-value');
    weatherCards.forEach(card => {
        if (card.textContent.includes('--')) {
            card.textContent = 'N/D';
        }
    });
    
    // Simular alguns dados para demonstração
    document.getElementById('temperature').textContent = '22°C';
    document.getElementById('pressure').textContent = '1015 hPa';
    document.getElementById('humidity').textContent = '75%';
    document.getElementById('wind-speed').textContent = '12 km/h';
    document.getElementById('wind-direction').textContent = 'Direção: SE';
    document.getElementById('weather-condition').textContent = 'Parcialmente nublado';
    document.getElementById('weather-description').textContent = 'Dados simulados';
    document.getElementById('water-temperature').textContent = '21°C';
}

// Função para inicializar dados climáticos
function initWeatherData() {
    // Mostrar indicador de carregamento
    const weatherValues = document.querySelectorAll('.weather-value');
    weatherValues.forEach(value => {
        if (value.textContent.includes('--')) {
            value.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        }
    });
    
    // Buscar dados após um pequeno delay
    setTimeout(() => {
        fetchWeatherData();
    }, 1000);
}

// Inicialização quando o DOM estiver carregado
window.addEventListener('DOMContentLoaded', function() {
    updateCurrentDate();
    updateMoonPhase();
    renderTideData();
    initVisitorCounter();
    initWeatherData(); // Adicionar inicialização dos dados climáticos
    
    // Atualizar dados climáticos a cada hora
    setInterval(fetchWeatherData, 3600000); // 1 hora = 3600000ms
});

