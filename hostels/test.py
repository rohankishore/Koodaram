import zipfile
import json
import os

# Data for SCTCE Ladies' Hostels from the provided PDF
hostel_data = [
    {
        "name": "Deepa Prabha Ladies Hostel",
        "address": "Deepa Prabha, Opposite Aster Lab, Near Whitedammar, NH Road side, Pappanamcode",
        "phone": "9633391299",
        "distance": "less than 1 km",
        "price": "6500"
    },
    {
        "name": "Reyaash Home Stay",
        "address": "TC 52/539, MRA-B 9, Mangalassery Lane, Oppo. Govt. Polytechnic, Kaimanam",
        "phone": "9037666515",
        "distance": "less than 1 km",
        "price": "6000"
    },
    {
        "name": "Ammus Hostel",
        "address": "TC 53/2439(1), Opposite CSIR NIIST, Industrial Estate P.O, Pappanamcode",
        "phone": "9020973188",
        "distance": "less than 2 km",
        "price": "6000"
    },
    {
        "name": "MAS Girls Hostel",
        "address": "TC 53/270,C K Sadanam, Near Care & Cure Hospital Estate Road, Pappanamcode",
        "phone": "9497004554",
        "distance": "less than 1 km",
        "price": "6500"
    },
    {
        "name": "Sai Hostel",
        "address": "TC 51/1965, Parthipuri, Papanamcode, Opposite Cavaliar India Coaching Centre",
        "phone": "9497853750",
        "distance": "less than 1 km",
        "price": "6500"
    },
    {
        "name": "Chinnus Hostel",
        "address": "Chirakkara Palace Lane, Opposite KSRTC Central Work, Papanamcode",
        "phone": "9496260318",
        "distance": "less than 1 km",
        "price": "6500"
    },
    {
        "name": "Arafa, BETA Girls Hostel",
        "address": "TC 53/2052(2), Opposite to kumar Tea Stall, Estate Road",
        "phone": "9048426865",
        "distance": "less than 1 km",
        "price": "6500"
    },
    {
        "name": "Aashiyana Hostel",
        "address": "Karakkamandapam junction, Nemom",
        "phone": "9447229223",
        "distance": "1 km",
        "price": "6000 / 5500"
    },
    {
        "name": "Girls Hostel",
        "address": "Near CSIR-NIIST, Nanthancode Lane Thukkuvila ANRA-63 Estate Road Pappanamcode",
        "phone": "9895718340",
        "distance": "less than 1 km",
        "price": "6000"
    },
    {
        "name": "Sudarsanam Ladies Hostel",
        "address": "Vivek Nagar, NSS Karayogam Road, Kaimanam",
        "phone": "9846724455",
        "distance": "less than 1 km",
        "price": "6500"
    },
    {
        "name": "Sreelakam Girls Hostel",
        "address": "TC 50/705, Devi Nagar, Old Karakkamandapam",
        "phone": "9400766060",
        "distance": "less than 2 Km",
        "price": "6500"
    }
]


# Create the zip file
with zipfile.ZipFile('hostels.zip', 'w', zipfile.ZIP_DEFLATED) as zipf:
    for hostel in hostel_data:
        # Create the full JSON object for the current hostel
        json_data = {
            "name": hostel["name"],
            "location": "",
            "college": "SCT Trivandrum",
            "roomType": "",
            "price": hostel["price"],
            "distance": hostel["distance"],
            "gender": "female",
            "contact": {
                "phone": hostel["phone"],
                "whatsapp": f"91{hostel['phone']}"
            },
            "rating": "",
            "amenities": [],
            "images": [
                "1.jpg",
                "2.jpg",
                "3.jpg"
            ],
            "gmap": "",
            "address": hostel["address"]
        }

        # Sanitize the hostel name for the folder name
        folder_name_raw = hostel["name"].split(',')[0].lower().replace("'", "").replace(' ', '_').replace('.', '').replace('(', '').replace(')', '')
        folder_name = f"{folder_name_raw}SCTCE/"

        # Convert the dictionary to a JSON formatted string
        json_string = json.dumps(json_data, indent=2)

        # Define the file path within the zip archive
        file_path = os.path.join(folder_name, "data.json")

        # Write the JSON string to the file within the zip archive
        zipf.writestr(file_path, json_string)

print("File 'hostels.zip' created successfully in your current directory.")