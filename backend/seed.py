import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from api.models import Category, Product, ProductVariant

def seed():
    print("Seeding database...")
    Category.objects.all().delete()
    Product.objects.all().delete()

    cat = Category.objects.create(name='Name Boards', slug='name-boards')

    products_data = [
        {
            "name": "Mehra Family Name Board",
            "slug": "mehra-family",
            "description": "Elegant gold lettering on black acrylic background.",
            "image": "/product1.png"
        },
        {
            "name": "Music Theme Name Board",
            "slug": "music-theme",
            "description": "Wooden texture acrylic board with music notes.",
            "image": "/product2.png"
        },
        {
            "name": "Kavya Heritage Om Board",
            "slug": "kavya-heritage",
            "description": "Premium black board with gold Om design.",
            "image": "/product3.png"
        },
        {
            "name": "Dhanya Niwas Ganesha Board",
            "slug": "dhanya-niwas",
            "description": "Clean white acrylic with elegant black Ganesha art.",
            "image": "/product4.png"
        },
        {
            "name": "Flute & Peacock Name Board",
            "slug": "flute-peacock",
            "description": "Traditional wooden finish with flute and peacock feather design.",
            "image": "/product5.png"
        },
        {
            "name": "Malayalam Flute Name Board",
            "slug": "malayalam-flute",
            "description": "Wooden finish with traditional Malayalam script and a golden flute.",
            "image": "/product6.png"
        },
        {
            "name": "Lord Shiva Name Board",
            "slug": "lord-shiva",
            "description": "Beautiful Lord Shiva art with elegant regional script.",
            "image": "/product7.png"
        },
        {
            "name": "Kamatchi Illam Name Board",
            "slug": "kamatchi-illam",
            "description": "Classic wooden board with golden Tamil script and peacock feather.",
            "image": "/product8.png"
        },
        {
            "name": "Sijee Cottage Name Board",
            "slug": "sijee-cottage",
            "description": "Sleek black acrylic board with a bright pink lotus logo.",
            "image": "/product9.png"
        },
        {
            "name": "Traditional Malayalam Name Board",
            "slug": "traditional-malayalam",
            "description": "Wooden texture board featuring intricate golden typography and profile art.",
            "image": "/product10.png"
        }
    ]

    for p_data in products_data:
        product = Product.objects.create(
            category=cat,
            name=p_data['name'],
            slug=p_data['slug'],
            description=p_data['description'],
            image_url=f"http://localhost:5173{p_data['image']}"
        )
        
        # Add 2mm variant
        ProductVariant.objects.create(
            product=product,
            thickness='2mm',
            price=549.00,
            stock=100
        )
        
        # Add 4mm variant
        ProductVariant.objects.create(
            product=product,
            thickness='4mm',
            price=850.00,
            stock=100
        )

    print("Database seeded successfully with all 10 products!")

if __name__ == '__main__':
    seed()
