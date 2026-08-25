import os
import urllib.request

# Las claves son las rutas relativas donde se guardarán las imágenes.
images = {
    "manillas/1.png": "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80&fm=png",
    "manillas/2.png": "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80&fm=png",
    "manillas/3.png": "https://images.unsplash.com/photo-1611085797613-7ca384393247?auto=format&fit=crop&w=1200&q=80&fm=png",
    "manillas/4.png": "https://images.unsplash.com/photo-1573408302185-06ff321cf6e6?auto=format&fit=crop&w=1200&q=80&fm=png",
    "manillas/5.png": "https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=1200&q=80&fm=png",
    "aretes-1.jpg": "https://images.unsplash.com/photo-1630019051930-475820eb2e16?auto=format&fit=crop&w=800&q=80",
    "aretes-2.jpg": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80",
    "aretes-3.jpg": "https://images.unsplash.com/photo-1617114919297-3c8ddb01f599?auto=format&fit=crop&w=800&q=80",
    "aretes-4.jpg": "https://images.unsplash.com/photo-1590548784585-645d2b65466c?auto=format&fit=crop&w=800&q=80",
    "aretes-5.jpg": "https://images.unsplash.com/photo-1588444839799-eb0ae27ee396?auto=format&fit=crop&w=800&q=80",
    "collares-1.jpg": "https://images.unsplash.com/photo-1599643478123-53d340391459?auto=format&fit=crop&w=800&q=80",
    "collares-2.jpg": "https://images.unsplash.com/photo-1611085583191-a3b13b24424a?auto=format&fit=crop&w=800&q=80",
    "collares-3.jpg": "https://images.unsplash.com/photo-1620656763407-e216de3597e1?auto=format&fit=crop&w=800&q=80",
    "collares-4.jpg": "https://images.unsplash.com/photo-1611652022519-a9261169299f?auto=format&fit=crop&w=800&q=80",
    "collares-5.jpg": "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?auto=format&fit=crop&w=800&q=80",
    "anillos-1.jpg": "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    "anillos-2.jpg": "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?auto=format&fit=crop&w=800&q=80",
    "anillos-3.jpg": "https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?auto=format&fit=crop&w=800&q=80",
    "anillos-4.jpg": "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?auto=format&fit=crop&w=800&q=80",
    "anillos-5.jpg": "https://images.unsplash.com/photo-1598560912005-59a0d5c1a396?auto=format&fit=crop&w=800&q=80",
    "accesorios-1.jpg": "https://images.unsplash.com/photo-1584302174644-fe207ecf137d?auto=format&fit=crop&w=800&q=80",
    "accesorios-2.jpg": "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=800&q=80",
    "accesorios-3.jpg": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80",
    "accesorios-4.jpg": "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=800&q=80",
    "accesorios-5.jpg": "https://images.unsplash.com/photo-1533228891725-217cffa21516?auto=format&fit=crop&w=800&q=80",
    "care-1.jpg": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=900&q=80",
    "care-2.jpg": "https://images.unsplash.com/photo-1517029082679-60c5cd3adf8c?auto=format&fit=crop&w=900&q=80",
    "care-3.jpg": "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?auto=format&fit=crop&w=900&q=80"
}

if not os.path.exists('img'):
    os.makedirs('img')

print("Iniciando descarga de imágenes predeterminadas...")
for name, url in images.items():
    try:
        path = os.path.join('img', name)
        # Asegura que la ruta de la imagen incluya el directorio 'img'
        path = os.path.join('img', name.replace("/", os.sep))
        # Crea el directorio si no existe (ej. 'img/manillas')
        os.makedirs(os.path.dirname(path), exist_ok=True)

        if not os.path.exists(path):
            urllib.request.urlretrieve(url, path)
            print(f"Descargado con éxito: {name}")
        else:
            print(f"El archivo ya existe: {name}")
    except Exception as e:
        print(f"Error al descargar {name}: {e}")

print("\nProceso finalizado. Ahora puedes usar las rutas locales en tu código.")