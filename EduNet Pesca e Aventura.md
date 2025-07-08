# EduNet Pesca e Aventura

Site dedicado à pesca esportiva com informações essenciais para pescadores.

## Funcionalidades

- ✅ **Data Atual**: Exibe a data atual formatada em português
- ✅ **Fase da Lua**: Calcula e exibe a fase atual da lua com ícone e descrição para pesca
- ✅ **Tábua de Marés**: Simulação realística das marés de Santos/SP com horários e alturas
- ✅ **Link para YouTube**: Botão direto para o canal do YouTube
- ✅ **Design Responsivo**: Funciona perfeitamente em desktop e mobile
- ✅ **Dicas de Pesca**: Informações úteis baseadas nas condições das marés e lua

## Tecnologias Utilizadas

- HTML5
- CSS3 com gradientes e animações
- JavaScript vanilla (sem dependências externas)
- Font Awesome para ícones
- Google Fonts (Roboto)

## Como Fazer Deploy no Vercel

### Opção 1: Via GitHub (Recomendado)

1. Faça upload dos arquivos para um repositório no GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Conecte sua conta do GitHub
4. Clique em "New Project"
5. Selecione o repositório do site
6. Configure:
   - **Framework Preset**: Other
   - **Root Directory**: ./
   - **Build Command**: (deixe vazio)
   - **Output Directory**: (deixe vazio)
7. Clique em "Deploy"

### Opção 2: Via Vercel CLI

1. Instale o Vercel CLI: `npm i -g vercel`
2. No diretório do projeto, execute: `vercel`
3. Siga as instruções na tela
4. Para atualizações futuras: `vercel --prod`

### Opção 3: Drag & Drop

1. Acesse [vercel.com](https://vercel.com)
2. Arraste a pasta do projeto para a área de upload
3. Aguarde o deploy automático

## Estrutura dos Arquivos

```
edunet-pesca-aventura/
├── index.html          # Página principal
├── style.css           # Estilos CSS
├── script.js           # Funcionalidades JavaScript
└── README.md           # Este arquivo
```

## Personalização

### Alterar Canal do YouTube

Edite a linha 2 do arquivo `script.js`:
```javascript
const YOUTUBE_CHANNEL_URL = 'SUA_URL_AQUI';
```

### Modificar Dados de Maré

As marés são simuladas baseadas em padrões reais de Santos. Para usar dados reais de uma API, modifique a função `getTideData()` no arquivo `script.js`.

### Customizar Cores

As cores principais estão definidas no arquivo `style.css`. Principais variáveis:
- Azul principal: `#2c5aa0`
- Verde água: `#4ecdc4`
- Vermelho destaque: `#ff6b6b`

## Funcionalidades Técnicas

- **Cálculo da Fase da Lua**: Algoritmo baseado em data juliana
- **Simulação de Marés**: Padrão realístico com 2 marés altas e 2 baixas por dia
- **Atualização Automática**: Dados atualizados periodicamente
- **Animações CSS**: Efeitos suaves de hover e transição
- **Scroll Suave**: Navegação fluida entre seções

## Compatibilidade

- ✅ Chrome/Edge (versões recentes)
- ✅ Firefox (versões recentes)
- ✅ Safari (versões recentes)
- ✅ Dispositivos móveis (iOS/Android)

## Suporte

Para dúvidas ou sugestões, entre em contato através do canal do YouTube.

---

**Desenvolvido para EduNet Pesca e Aventura** 🎣

