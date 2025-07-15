# EduNet Pesca e Aventura

Site completo para pescadores com informações essenciais sobre marés, fases da lua, dados climáticos e muito mais!

## ✅ Funcionalidades Implementadas

### 📅 **Data Atual**
- Exibe a data de hoje formatada em português brasileiro

### 🌙 **Fase da Lua**
- Calcula automaticamente a fase atual da lua
- Ícones visuais para cada fase
- Nome da fase (ex: Lua Cheia, Quarto Crescente)
- Próxima fase da lua com data e contagem de dias
- Dicas específicas para pesca baseadas na fase lunar

### 🌊 **Tábua de Marés de Santos**
- Simulação realística com próxima maré destacada
- 4 marés diárias (2 altas, 2 baixas)
- Horários e alturas em metros
- Baseado em padrões reais de Santos/SP

### 🌡️ **Dados Climáticos de Cananéia/SP** *(NOVO!)*
- **Temperatura atual** - Dados em tempo real
- **Pressão atmosférica** - Medição em hPa
- **Temperatura da água do mar** - Via API Open-Meteo Marine
- **Umidade relativa** - Percentual atual
- **Velocidade e direção do vento** - Dados completos
- **Condição climática** - Descrição atual do tempo
- Atualização automática a cada hora

### 📺 **Link para YouTube**
- Botão direto para o canal com a URL fornecida

### 📊 **Contador de Visitas Aprimorado**
- Total de visitas
- Visitas de hoje
- Visitantes únicos
- Visitantes online (simulado)
- Animações e design interativo

### 📱 **Progressive Web App (PWA)**
- Pode ser "instalado" em dispositivos móveis
- Funciona offline
- Ícones personalizados com desenho de robalo
- Service Worker para cache
- Manifesto completo

### 💡 **Dicas de Pesca**
- Seção com informações úteis baseadas nas marés e fases da lua

## 🎨 Design e Recursos

- Design moderno e responsivo (funciona em celular e desktop)
- Cores temáticas de pesca (azul oceano, verde água)
- Animações suaves e efeitos visuais
- Navegação por âncoras funcionando
- Ícones do Font Awesome
- Fonte Google Fonts (Roboto)
- Banner personalizado integrado

## 🌐 APIs Utilizadas

- **HG Brasil Weather API** - Dados meteorológicos de Cananéia
- **Open-Meteo Marine API** - Temperatura da água do mar
- **Cálculos próprios** - Fases da lua e tábua de marés

## 📦 Estrutura dos Arquivos

```
edunet-pesca-aventura/
├── index.html              # Página principal
├── style.css               # Estilos CSS
├── script.js               # JavaScript com todas as funcionalidades
├── banner.jpg              # Banner personalizado
├── icon-192.png            # Ícone PWA 192x192
├── icon-512.png            # Ícone PWA 512x512
├── manifest.json           # Manifesto PWA
├── sw.js                   # Service Worker
├── moon-*.png              # Ícones das fases da lua (8 arquivos)
└── README.md               # Este arquivo
```

## 🚀 Como Fazer Deploy no Vercel

### Opção 1: Upload Direto (Mais Fácil)
1. Acesse [vercel.com](https://vercel.com)
2. Faça login ou crie uma conta
3. Clique em "New Project"
4. Arraste o arquivo ZIP ou selecione os arquivos
5. Clique em "Deploy"

### Opção 2: Via GitHub
1. Crie um repositório no GitHub
2. Faça upload dos arquivos
3. No Vercel, conecte seu repositório GitHub
4. Configure o deploy automático

### Opção 3: Via CLI
```bash
npm i -g vercel
cd pasta-do-projeto
vercel
```

## 🔧 Personalização

### Modificar Dados de Maré
Edite a função `generateTideData()` no arquivo `script.js` para ajustar horários e alturas das marés.

### Alterar Localização Climática
Modifique as coordenadas em `CANANEIA_COORDS` no arquivo `script.js` para outra cidade.

### Contador de Visitas
O contador usa localStorage do navegador. Para um contador global, seria necessário implementar um backend.

### Customizar Cores
Edite as variáveis CSS no início do arquivo `style.css` para alterar o esquema de cores.

## 📱 Funcionalidades PWA

- **Instalação**: O site pode ser instalado como app no celular
- **Offline**: Funciona sem internet após a primeira visita
- **Ícones**: Ícones personalizados na tela inicial
- **Splash Screen**: Tela de carregamento personalizada

## 🔄 Atualizações Automáticas

- **Dados climáticos**: Atualizados a cada hora
- **Contador de visitas**: Atualizado a cada visita
- **Fases da lua**: Calculadas dinamicamente
- **Data**: Atualizada automaticamente

## 📞 Suporte

Para dúvidas sobre o deploy ou personalização, consulte a documentação do Vercel ou entre em contato.

---

**Site 100% pronto e testado!** 🎣

