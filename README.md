# SHRI MANJUNATHA GRAND VEG — Website

Responsive multi-page restaurant website for Shri Manjunatha Grand Veg, Doddaballapura.

## Pages
- Home (`index.html`)
- Our Story (`about.html`)
- Menu (`menu.html`)
- Gallery (`gallery.html`)
- Banquet (`banquet.html`)
- Contact (`contact.html`)
- Cart (`cart.html`)

## Menu and ordering
- 113 menu entries retained in `assets/menu-data.js`.
- Item names, descriptions, categories and prices are preserved from the supplied menu dataset.
- Search, category filters, add-to-cart, quantity controls and WhatsApp order-request checkout.
- WhatsApp order destination: +91 98445 55042.
- The cart is stored in the visitor's browser using localStorage.
- Prices and availability should be confirmed by the restaurant before accepting an order.

## Dish photos — important source note
- Each menu item has a distinct photo URL, generated with dish-specific food search terms and a unique lock value. The remote photo service may return illustrative food imagery, not necessarily the restaurant's own serving.
- If a remote image fails, that dish has its own locally stored SVG fallback tile in `assets/images/menu/`.
- Every menu item also has a Google Images search link scoped to the restaurant name and dish name.
- The restaurant's supplied Google Maps photo link is included in the Gallery page. Google Maps listing/gallery images are not automatically downloadable for all menu items, so the website does not falsely label generic food photos as restaurant-owned photos.
- For an authentic final production menu, replace illustrative photos with images supplied or approved by the restaurant.

## Run locally
Extract the ZIP and open `index.html`. For best results, run a local static server from this folder:
`python -m http.server 8000`
Then visit `http://localhost:8000`.

## Deployment
Upload the entire folder (not just `index.html`) to GitHub Pages, Netlify or another static host. Keep the `assets` folder alongside all HTML pages.

## Order flow
The cart opens WhatsApp with selected dishes, quantities, subtotal and customer details prefilled. This is an order request; the restaurant must confirm availability and final amount.


## Menu photo status
Menu images are stored locally under `assets/images/menu/`. The first completed generated dish photograph is `paneer-butter-masala.png`. Other dishes currently use local preview placeholders until their individual photographs are added. No Google Images links are included in the menu. Generated food imagery is illustrative and should not be represented as actual restaurant photography.


## Menu design update
The menu page now follows the supplied visual reference: forest-green navigation, ivory background, food-category shortcuts, a left category panel, a search field, and compact five-column dish cards with prices and add-to-cart controls. The first 16 menu entries use locally stored generated food photographs; the remaining entries still use their local illustrated fallback tiles until their individual photographs are added. All menu image paths are local to this website; there are no Google Images links in the menu.


## Latest full-site build (20 November 2026)

- The menu contains 113 items across 11 categories.
- The menu page follows the supplied green, gold and ivory reference layout, with a left category panel, horizontal category shortcuts, search, five-column desktop cards, and responsive tablet/mobile layouts.
- Local food photographs are included for 31 menu items (North Indian curries and breakfast items). The remaining menu items currently use local illustrated fallback artwork; these are not represented as real food photographs.
- All menu image paths are local to the website; the menu cards do not link to Google Images.
- Cart and WhatsApp ordering flow are retained.

To preview locally, extract the ZIP and open `index.html` or `menu.html` in a browser. For hosting, upload the complete extracted folder to a static host such as GitHub Pages.


## Visual refresh and review section (20 November 2026)
- Unified green, gold and cream visual direction across all pages.
- Added a local menu hero image and local dish imagery; menu cards retain unique illustrated fallbacks for items still awaiting a dedicated photograph.
- Added a Google guest-feedback section using short review excerpts and the currently surfaced Google listing rating snapshot (4.5/5, 395 reviews). Ratings and review counts can change; the link opens the live listing.
- Phone and address remain the restaurant details already supplied/verified for the Doddaballapura location.


## Image and review notes
- The menu includes 113 items. Dedicated local food photographs are currently installed for 48 items; the remaining items retain their individual illustrated fallback tiles while photographs are pending. These fallbacks are not represented as food photos.
- The locally stored generated food photographs are illustrative references, not verified photographs of the restaurant's own plating. Replace them with restaurant-owned photos for an authentic final production gallery.
- The home-page guest-feedback panel uses short excerpts surfaced in public Google listing highlights. The rating/count is a snapshot and may change; use the live Google Maps listing link for current reviews. No reviewer identities are invented.
- Restaurant phone: +91 98445 55042. Address: Scout Camp Road, next to Max Showroom, Doddaballapura, Karnataka 562163, India.


## Food photography update

Added 16 individually cropped, locally stored illustrative food photographs from a generated 4×4 food-photo sheet. These are illustrative AI-generated food images, not verified photographs of the restaurant's own servings. Remaining menu items without individual photos continue to use their existing local illustration fallback until matching photos are added.


### Additional dish-photo mapping audit

Re-cropped a generated 8×4 food-photo contact sheet into 20 individual image files and matched them to the corresponding beverage, chaat, curry, and pav-bhaji entries. Images are AI-generated illustrative food photos, not restaurant-owned photographs.


## Menu image completion
All 113 menu items now have a local JPEG image in `assets/images/menu/`. The additional images are individually cropped from generated food-photo sheets and packaged locally; they are illustrative AI-generated food imagery, not verified photographs of the restaurant’s own plating. No Google Images links are used.


## Menu image mapping audit

Every menu item has a dedicated local image file named with its menu number and dish name. See `IMAGE_AUDIT.csv` for the full item-to-image mapping. Images are illustrative AI-generated food photographs, not verified photos of the restaurant's actual servings.


## Banquet and Contact page update

The Banquet page now includes a more polished event introduction, occasion categories, and a detailed event enquiry form (occasion, date, guest count, preferred time and requirements). The Contact page now includes dedicated address, phone, WhatsApp and hours cards, a location/map panel, and a structured enquiry form. Both forms prepare a WhatsApp message for the visitor to review and send; they do not submit data automatically.


Home page photography: the homepage now uses four distinct locally stored illustrative images (restaurant exterior, dining room, banquet hall and vegetarian feast). These are AI-generated visual assets for presentation and are not verified photographs of the actual premises.


Venue photo note: the homepage and banquet page now use the actual exterior photograph supplied by the restaurant. The food hero image has been removed from the banquet introduction. Add the original interior/banquet photographs as separate image files to complete the venue gallery.


## Venue photography update
- The Home page hero rotates between the actual hotel exterior and two actual party-hall photographs every 1 second.
- The Banquet page uses the user-supplied party-hall and exterior photographs only; no menu food images are used in its venue gallery.
- Venue photographs are stored locally under `assets/images/venue/`.
