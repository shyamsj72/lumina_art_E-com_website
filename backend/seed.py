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
        {'name': 'Premium Name Board - Style 1', 'image_url': '/nameboard1.png'},
        {'name': 'Premium Name Board - Style 2', 'image_url': '/nameboard2.png'},
        {'name': 'Premium Name Board - Style 3', 'image_url': '/nameboard3.png'},
        {'name': 'Premium Name Board - Style 4', 'image_url': '/nameboard4.png'},
        {'name': 'Premium Name Board - Style 5', 'image_url': '/nameboard5.png'},
        {'name': 'Premium Name Board - Style 6', 'image_url': '/nameboard6.png'},
        {'name': 'Premium Name Board - Style 7', 'image_url': '/nameboard7.png'},
        {'name': 'Premium Name Board - Style 8', 'image_url': '/nameboard8.png'},
        {'name': 'Premium Name Board - Style 9', 'image_url': '/nameboard9.png'},
        {'name': 'Premium Name Board - Style 10', 'image_url': '/nameboard10.png'},
        {'name': 'Premium Name Board - Style 11', 'image_url': '/nameboard11.png'},
        {'name': 'Premium Name Board - Style 12', 'image_url': '/nameboard12.png'},
        {'name': 'Premium Name Board - Style 13', 'image_url': '/nameboard13.png'},
        {'name': 'Premium Name Board - Style 14', 'image_url': '/nameboard14.png'},
    ]

    for i, data in enumerate(products_data):
        slug = data['name'].lower().replace(' ', '-')
        p = Product.objects.create(
            category=cat,
            name=data['name'],
            slug=slug,
            description="Premium custom CNC cut name board. High quality, weather-resistant, and beautifully designed to make your entrance stand out.",
            image_url=data['image_url']
        )
        
        # Create thickness variants
        ProductVariant.objects.create(
            product=p,
            thickness='2mm',
            price=549.00
        )
        
        ProductVariant.objects.create(
            product=p,
            thickness='4mm',
            price=850.00
        )

    print("Successfully seeded 14 Name Board products with 2mm and 4mm variants!")

if __name__ == '__main__':
    seed()
