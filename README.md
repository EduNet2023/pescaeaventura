# EduNet Pesca e Aventura

Site dedicado à pesca esportiva com informações essenciais para pescadores, agora como um Progressive Web App (PWA).

## Funcionalidades

- ✅ **Data Atual**: Exibe a data atual formatada em português brasileiro.
- ✅ **Fase da Lua**: Calcula e exibe a fase atual da lua com ícone e descrição para pesca. **Agora também mostra a próxima fase da lua e a data em que ela ocorrerá!**
- ✅ **Tábua de Marés**: Simulação realística das marés de Santos/SP com horários e alturas.
- ✅ **Link para YouTube**: Botão direto para o canal do YouTube.
- ✅ **Banner Personalizado**: Imagem promocional do EduNet Pesca e Aventura.
- ✅ **Contador de Visitas**: Sistema de contagem de visitantes únicos por dia.
- ✅ **Design Responsivo**: Funciona perfeitamente em desktop e mobile.
- ✅ **Dicas de Pesca**: Informações úteis baseadas nas condições das marés e lua.

## Progressive Web App (PWA)

Este site foi configurado como um PWA, permitindo que os usuários o "instalem" em seus dispositivos móveis e o acessem offline. Para que o PWA funcione corretamente, o site deve ser servido via HTTPS. No Vercel, isso é configurado automaticamente.

**Recursos PWA:**
- **Manifest.json**: Define o nome do aplicativo, ícones, tema e cor de fundo.
- **Service Worker (sw.js)**: Permite o cache de arquivos para acesso offline e outras funcionalidades avançadas.

**Ícones:**
Os ícones foram gerados com um desenho de robalo e tema azul, conforme sua solicitação.

## Tecnologias Utilizadas

- HTML5
- CSS3 com gradientes e animações
- JavaScript vanilla (sem dependências externas)
- LocalStorage para persistência do contador de visitas
- Font Awesome para ícones
- Google Fonts (Roboto)

## Estrutura dos Arquivos

```
edunet-pesca-aventura/
├── index.html          # Página principal
├── style.css           # Estilos CSS
├── script.js           # Funcionalidades JavaScript
├── banner.jpg          # Banner promocional
├── icon-192.png        # Ícone PWA (192x192px)
├── icon-512.png        # Ícone PWA (512x512px)
├── manifest.json       # Manifesto do PWA
├── sw.js               # Service Worker do PWA
└── README.md           # Este arquivo
```

## Como Fazer Deploy no Vercel

1.  **Opção Mais Fácil (Recomendado)**: Acesse [vercel.com](https://vercel.com) e arraste a pasta `edunet-pesca-aventura` (ou o arquivo ZIP `edunet-pesca-aventura-final.zip` que você recebeu) diretamente para a página de deploy. O Vercel detectará automaticamente o projeto e fará o deploy.
2.  **Via GitHub**: Faça upload de todos os arquivos para um novo repositório no GitHub, GitLab ou Bitbucket. Em seguida, conecte seu repositório ao Vercel através do painel de controle do Vercel. Cada push para o repositório resultará em um novo deploy.
3.  **Via Vercel CLI**: Se você tiver o Vercel CLI instalado (`npm i -g vercel`), navegue até a pasta `edunet-pesca-aventura` no seu terminal e execute o comando `vercel`. Siga as instruções no terminal.

**Observação sobre o PWA**: Embora o PWA tenha sido configurado, o registro do Service Worker pode não funcionar perfeitamente em um servidor local simples (como o `python3 -m http.server`). No entanto, após o deploy em um ambiente como o Vercel (que serve via HTTPS), o PWA deve funcionar conforme o esperado, permitindo a instalação do site como um aplicativo em dispositivos móveis e o acesso offline.

## Personalização

### Alterar Canal do YouTube

Edite a linha 3 do arquivo `script.js`:
```javascript
const YOUTUBE_CHANNEL_URL = 'SUA_URL_AQUI';
```

### Modificar Dados de Maré

As marés são simuladas baseadas em padrões reais de Santos. Para usar dados reais de uma API, modifique a função `getTideData()` no arquivo `script.js`.

### Gerenciar Contador de Visitas

O contador de visitas usa localStorage e conta visitantes únicos por dia. Funções disponíveis:
- `getVisitorStats()` - Retorna estatísticas de visitas
- `resetVisitorCounter()` - Reseta o contador (para desenvolvimento)
- `simulateOnlineVisitors()` - Simula visitantes online

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

