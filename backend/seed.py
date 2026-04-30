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
        {'name': 'Jungle Tusker Name Board', 'image_url': '/nameboard1.png'},
        {'name': 'Dua Manzil Name Board', 'image_url': '/nameboard2.png'},
        {'name': 'Heza Manzil Name Board', 'image_url': '/nameboard3.png'},
        {'name': 'Baith Al Nihmath Name Board', 'image_url': '/nameboard4.png'},
        {'name': 'Janaki Nivas Name Board', 'image_url': '/nameboard5.png'},
        {'name': 'Thekkemadam Name Board', 'image_url': '/nameboard6.png'},
        {'name': 'Snehanilayam Name Board', 'image_url': '/nameboard7.png'},
        {'name': 'Gokulam Name Board', 'image_url': '/nameboard8.png'},
        {'name': 'Aadishivam Name Board', 'image_url': '/nameboard9.png'},
        {'name': 'Kalladayil Name Board', 'image_url': '/nameboard10.png'},
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

    print("Successfully seeded 10 Name Board products with 2mm and 4mm variants!")

if __name__ == '__main__':
    seed()
