# Boldway Clone

Uma réplica completa do site da [Boldway](https://boldway.com.br/) construída com Next.js, TypeScript, Tailwind CSS e Framer Motion.

## 🚀 Tecnologias Utilizadas

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS** - Estilização
- **Framer Motion** - Animações
- **Lucide React** - Ícones

## 📋 Funcionalidades

- ✅ Design responsivo para mobile e desktop
- ✅ Animações suaves com Framer Motion
- ✅ Navegação fixa com menu mobile
- ✅ Seções completas:
  - Hero com animações de texto
  - Projetos/Cases em grid
  - Serviços organizados
  - Depoimentos de clientes
  - Call-to-action com formulário
  - Seção lifestyle
  - Footer completo

## 🛠️ Como executar

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Executar em modo desenvolvimento:**
   ```bash
   npm run dev
   ```

3. **Abrir no navegador:**
   ```
   http://localhost:3000
   ```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── ProjectsSection.tsx
│   ├── ServicesSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── CTASection.tsx
│   └── LifestyleSection.tsx
```

## 🎨 Design System

- **Cores principais:** Preto (#000) e Branco (#fff)
- **Tipografia:** Inter (Google Fonts)
- **Animações:** Framer Motion com transições suaves
- **Layout:** Grid responsivo com Tailwind CSS

## 📱 Responsividade

O site foi desenvolvido com foco em mobile-first, seguindo as melhores práticas de design responsivo:

- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Navegação adaptável (menu hambúrguer em mobile)
- Textos e espaçamentos otimizados para cada tamanho de tela

## 🚀 Deploy

Para fazer deploy em produção:

```bash
npm run build
npm start
```

Ou use plataformas como Vercel, Netlify ou Railway para deploy automático.

## 📝 Próximos Passos

- [ ] Adicionar mais projetos ao portfólio
- [ ] Implementar formulário de contato funcional
- [ ] Adicionar mais animações interativas
- [ ] Otimizar imagens e performance
- [ ] Adicionar testes unitários

---

**Desenvolvido com ❤️ usando as melhores práticas de desenvolvimento web moderno.**