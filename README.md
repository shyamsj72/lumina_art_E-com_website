# Lumina Art – README

## Overview

**Lumina Art Shop** is a real-world eCommerce web application built for showcasing and selling custom products online.
The platform is designed for a small business that offers products such as CNC Jali Cutting, Laser Cutting, Wood & Acrylic Craft, and LED Signage.

This project provides customers with a smooth browsing experience, product discovery, and direct order placement through WhatsApp, making it practical for real-world business operations without requiring a full payment gateway integration.

---

## Live Demo

**Frontend (Vercel):** [https://lumina-art-e-com-website.vercel.app/]

---

## Features

* Modern and responsive eCommerce UI
* Product listing with categories
* Product detail pages
* Search and filter functionality
* Add to cart system
* WhatsApp redirection for direct order placement
* Admin panel for product management
* REST API integration
* Mobile-friendly design
* Real-world business workflow implementation

---

## Tech Stack

### Frontend

* React
* JavaScript (ES6+)
* HTML5
* CSS3
* Axios
* React Router

### Backend

* Django
* Django REST Framework
* Python

### Database

* PostgreSQL

### Deployment

* Vercel (Frontend Hosting)
* Free-tier cloud backend hosting (Backend Deployment)

---

## Project Purpose

The goal of **Shop Lumina Art** is to provide a production-oriented eCommerce solution for a real business.
Instead of building a generic demo store, this project focuses on solving actual business needs:

* Display products professionally
* Help customers browse categories easily
* Simplify inquiries and order placement
* Enable direct communication through WhatsApp
* Provide a scalable base for future payment integration

This makes the project more than just a portfolio piece — it is a practical business application.

---

## Architecture

The project follows a full-stack architecture:

* **Frontend:** Built with React for dynamic and responsive user experience
* **Backend:** Built with Django REST Framework for API handling and business logic
* **Database:** PostgreSQL for reliable structured data storage
* **Communication Flow:** Customer places order → redirected to WhatsApp with product/order details

---

## WhatsApp Order Flow

One of the core real-world features of this platform is the **WhatsApp-based ordering system**.

Instead of integrating a payment gateway in the initial version, customers can:

1. Browse products
2. Add items to cart
3. Proceed to order
4. Get redirected to WhatsApp with pre-filled order details
5. Confirm the order directly with the seller

This approach is highly practical for small businesses and local sellers because it:

* Reduces payment gateway complexity
* Builds direct customer trust
* Enables faster manual order confirmation
* Works well for custom-made products

---

## Deployment

The project is deployed using cost-effective hosting solutions:

* **Frontend:** Hosted on Vercel for fast and reliable static deployment
* **Backend:** Hosted on a free-tier cloud hosting service
* **Database:** PostgreSQL for persistent relational storage

This setup keeps the project production-ready while maintaining minimal operational cost.

---

## Use Case

**Shop Lumina Art** is designed for businesses that sell:

* CNC Jali Cutting
* Laser Cutting
* Wood & Acrylic Craft
* LED Signage
* Custom decorative products

It can be adapted for any small-to-medium business that needs:

* Online product showcase
* Customer inquiry system
* Simple order management
* Direct WhatsApp sales workflow

---

## Future Improvements

* Online payment gateway integration
* User authentication & order history
* Wishlist functionality
* Product reviews & ratings
* Inventory management
* Order tracking
* Email notifications
* Admin analytics dashboard

---

## Installation

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Backend Setup

```bash
cd backend
pip install -r requirements.txt
python manage.py runserver
```

---

## Why This Project Matters

This project demonstrates real-world full-stack development by solving an actual business problem instead of only focusing on academic implementation.

It highlights:

* Practical business logic
* Full-stack architecture
* Real deployment experience
* API integration
* Customer-focused workflow
* Cost-efficient production hosting

---

## Author

**Shyamjith K**
Full Stack Developer
Built as a real-world applied eCommerce solution for business use.

---

## License

This project is developed for educational, portfolio, and business demonstration purposes.
