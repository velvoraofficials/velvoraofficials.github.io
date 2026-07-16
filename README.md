# Velvora IT Infrastructure Services — Website

A premium, modern, fully responsive business website for **Velvora IT Infrastructure Services**, built with plain HTML5, CSS3, and vanilla JavaScript. No frameworks, no build step — ready to deploy on GitHub Pages.

## Files

```
velvora/
├── index.html      # Main page (all sections)
├── style.css       # All styling, responsive breakpoints, animations
├── script.js       # Nav behavior, scroll animations, form validation
├── assets/
│   └── logo-nav-mono.png   # Company logo (navbar + footer)
└── README.md
```

## 1. Running Locally

You don't need any build tools. Just open the site in a browser:

- **Quickest way:** double-click `index.html` to open it directly in your browser.
- **Recommended way (avoids some browser file-access quirks):**
  - If you have VS Code, install the "Live Server" extension, right-click `index.html`, and choose **Open with Live Server**.
  - Or, with Python installed, run this from inside the project folder:
    ```
    python -m http.server 8000
    ```
    Then open `http://localhost:8000` in your browser.

## 2. Uploading to GitHub Pages

1. Create a new repository on GitHub (e.g. `velvora-website`).
2. Upload all files (`index.html`, `style.css`, `script.js`, `assets/` folder, `README.md`) to the repository, keeping the same folder structure.
3. Go to your repository's **Settings → Pages**.
4. Under "Build and deployment", set **Source** to `Deploy from a branch`.
5. Choose the `main` branch and `/ (root)` folder, then click **Save**.
6. GitHub will publish your site at:
   `https://<your-username>.github.io/<repository-name>/`
   (This can take a minute or two the first time.)

## 3. Replacing Images

The site currently uses free, royalty-free Unsplash images (server racks, network cabling, CCTV camera, and a team/office photo) loaded directly via URL — no image files needed for these. To use your own photos instead:

- **Hero image:** find `class="hero-img"` in `index.html` and replace the `src` with your own image path (e.g. `assets/hero.jpg`).
- **About image:** find `class="about-image"` and replace its `<img src="...">`.
- **Service card images** (CCTV, Network & Security): find `class="service-media"` blocks in the Services section and replace the `src` attributes.
- **Contact image:** find `class="contact-image"` near the bottom of the Contact section.

For any new image file:
1. Add it into the `assets/` folder.
2. Update the `src="..."` path in `index.html` to point to it, e.g. `src="assets/your-image.jpg"`.
3. Keep the `alt="..."` text descriptive for accessibility and SEO.

## 4. Replacing the Logo

The navbar and footer both use `assets/logo-nav-mono.png`. To use a different logo:

1. Add your new logo file into the `assets/` folder.
2. In `index.html`, update **both** occurrences of:
   ```html
   <img src="assets/logo-nav-mono.png" alt="Velvora IT Infrastructure Services logo" ...>
   ```
   to point to your new file name.
3. If your new logo is a colored version (not white/mono), you may want to remove this line in `style.css` under `.footer-logo`, which currently forces the footer logo to appear white:
   ```css
   filter: brightness(0) invert(1);
   ```

## 5. Replacing Partner Logos

In `index.html`, find the **Our Support Partners** section (`id="partners"`). Each partner is currently a placeholder `<div>`:

```html
<div class="partner-logo fade-in"><span>Partner Logo</span></div>
```

Replace each one with an actual logo image, for example:

```html
<div class="partner-logo fade-in">
  <img src="assets/partner-1.png" alt="Partner Name logo" loading="lazy">
</div>
```

You may want to add this small CSS rule so uploaded logos scale neatly inside the placeholder box:

```css
.partner-logo img { max-width: 80%; max-height: 60%; object-fit: contain; }
```

## 6. Editing Contact Information

Contact details currently appear in **three places** in `index.html` — update all three if you change phone, WhatsApp, or email:

1. **Contact section** (`id="contact"`) — the `contact-details` list and the Call/WhatsApp/Email buttons.
2. **Footer** — the `footer-contact` list.
3. Any `tel:`, `https://wa.me/`, and `mailto:` links throughout the page (hero "Call Now" button, sticky elements, etc.)

Current values used:
- Phone: `9998877062`, `8155809229`
- WhatsApp: `9998877062`
- Email: `velvora.officials@gmail.com`

## 7. Connecting the Contact Form (EmailJS or FormSubmit)

The form currently validates input with JavaScript and shows a success message, but does **not** send real emails yet. Choose one of the two no-backend options below.

### Option A — EmailJS (recommended, keeps the AJAX experience)

1. Create a free account at [emailjs.com](https://www.emailjs.com).
2. Set up an **Email Service** (e.g. connect your Gmail) and an **Email Template** with fields like `name`, `phone`, `email`, `service`, `message`.
3. In `index.html`, add the EmailJS SDK before `script.js`:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   <script>emailjs.init('YOUR_PUBLIC_KEY');</script>
   ```
4. In `script.js`, find the comment block labeled `SIMULATED SUBMIT` inside `handleFormSubmit` logic and replace it with:
   ```javascript
   emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
     name: fields.name.input.value,
     phone: fields.phone.input.value,
     email: fields.email.input.value,
     service: fields.service.input.value,
     message: document.getElementById('message').value
   }).then(function () {
     showSuccess();
     form.reset();
   }).catch(function (error) {
     console.error('EmailJS error:', error);
   });
   ```

### Option B — FormSubmit (simplest, no JavaScript required)

1. In `index.html`, change the form's opening tag from:
   ```html
   <form id="contactForm" class="contact-form" novalidate>
   ```
   to:
   ```html
   <form id="contactForm" class="contact-form" action="https://formsubmit.co/velvora.officials@gmail.com" method="POST">
   ```
2. The first time someone submits the form, FormSubmit will send a confirmation email to `velvora.officials@gmail.com` — click the link inside it to activate the endpoint.
3. Optional: add a hidden field to control the redirect after submission:
   ```html
   <input type="hidden" name="_next" value="https://your-username.github.io/velvora-website/thank-you.html">
   ```

## 8. Notes on Performance & SEO

- Images below the hero use `loading="lazy"` for faster initial page loads.
- All headings follow a proper hierarchy (`h1` → `h2` → `h3`).
- Meta title, description, keywords, and Open Graph tags are set in the `<head>` of `index.html` — update them if your branding or target keywords change.
- The whole site uses only three external requests beyond the images: Google Fonts (Poppins), Font Awesome (icons), and no JavaScript libraries — keeping it fast and lightweight.

## 9. Browser Support

Built with standard, well-supported CSS (CSS variables, Grid, Flexbox) and vanilla JS (`IntersectionObserver`, with a fallback for very old browsers). Works on all modern browsers (Chrome, Firefox, Safari, Edge) on both desktop and mobile.

---

© 2026 Velvora IT Infrastructure Services. All Rights Reserved.
