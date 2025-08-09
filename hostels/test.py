import zipfile
import json
import os

# The hostel data you provided
hostel_data = [
  {
    "name": "Achus Hostel",
    "location": "",
    "college": "SCT Trivandrum",
    "roomType": "",
    "price": "6000",
    "distance": "less than 1 km",
    "gender": "male",
    "contact": {
      "phone": "8136954246",
      "whatsapp": "918136954246"
    },
    "rating": "",
    "amenities": [],
    "images": [
      "1.jpg",
      "2.jpg",
      "3.jpg"
    ],
    "gmap": "",
    "address": "Susha Bhavan, Palace road, Pappanamcode (Opp. KSRTC central works)"
  },
  {
    "name": "Atham Boys Hostel",
    "location": "",
    "college": "SCT Trivandrum",
    "roomType": "",
    "price": "6000",
    "distance": "1 Km",
    "gender": "male",
    "contact": {
      "phone": "8848726001",
      "whatsapp": "918848726001"
    },
    "rating": "",
    "amenities": [],
    "images": [
      "1.jpg",
      "2.jpg",
      "3.jpg"
    ],
    "gmap": "",
    "address": "SivaLalitham, TC 52/3245 Viswambaran Road Pappanamcode"
  },
  {
    "name": "Vipas Hostel",
    "location": "",
    "college": "SCT Trivandrum",
    "roomType": "",
    "price": "6000",
    "distance": "less than 1 km",
    "gender": "male",
    "contact": {
      "phone": "9447244188",
      "whatsapp": "919447244188"
    },
    "rating": "",
    "amenities": [],
    "images": [
      "1.jpg",
      "2.jpg",
      "3.jpg"
    ],
    "gmap": "",
    "address": "Kairali Garden, Viswambharan Road, Pappanamcode"
  },
  {
    "name": "Boys Hostel",
    "location": "",
    "college": "SCT Trivandrum",
    "roomType": "",
    "price": "6000",
    "distance": "less than 1 km",
    "gender": "male",
    "contact": {
      "phone": "9895718340",
      "whatsapp": "919895718340"
    },
    "rating": "",
    "amenities": [],
    "images": [
      "1.jpg",
      "2.jpg",
      "3.jpg"
    ],
    "gmap": "",
    "address": "Near CSIR-NIIST, Nanthancode Lane Thukkuvila ANRA-63 Estate Road Pappanamcode"
  },
  {
    "name": "Akshaya Hostel",
    "location": "",
    "college": "SCT Trivandrum",
    "roomType": "",
    "price": "6000",
    "distance": "less than 1 km",
    "gender": "male",
    "contact": {
      "phone": "8129795560",
      "whatsapp": "918129795560"
    },
    "rating": "",
    "amenities": [],
    "images": [
      "1.jpg",
      "2.jpg",
      "3.jpg"
    ],
    "gmap": "",
    "address": "Near SBI, Pappanamcode Kuttikadu Lane, Opposite Dental clinic"
  },
  {
    "name": "CASTELLO BOYS HOSTEL",
    "location": "",
    "college": "SCT Trivandrum",
    "roomType": "",
    "price": "6000",
    "distance": "less than 1 km",
    "gender": "male",
    "contact": {
      "phone": "9447321328",
      "whatsapp": "919447321328"
    },
    "rating": "",
    "amenities": [],
    "images": [
      "1.jpg",
      "2.jpg",
      "3.jpg"
    ],
    "gmap": "",
    "address": "TC 52/1904, Kaimanom, Thiruvananthapuram-40"
  },
  {
    "name": "Komalam's boys hostel",
    "location": "",
    "college": "SCT Trivandrum",
    "roomType": "",
    "price": "6000",
    "distance": "less than 1 km",
    "gender": "male",
    "contact": {
      "phone": "8281412050",
      "whatsapp": "918281412050"
    },
    "rating": "",
    "amenities": [],
    "images": [
      "1.jpg",
      "2.jpg",
      "3.jpg"
    ],
    "gmap": "",
    "address": "N-12, Nirappil lane, Ram Nagar, Pappanamcode-18"
  },
  {
    "name": "Niaz Hostel",
    "location": "",
    "college": "SCT Trivandrum",
    "roomType": "",
    "price": "6000",
    "distance": "1 Km",
    "gender": "male",
    "contact": {
      "phone": "7025029233",
      "whatsapp": "917025029233"
    },
    "rating": "",
    "amenities": [],
    "images": [
      "1.jpg",
      "2.jpg",
      "3.jpg"
    ],
    "gmap": "",
    "address": "Niyas Building, Karakkamandapam, Nemom PO"
  },
  {
    "name": "Sreedeepam Boys Hostel",
    "location": "",
    "college": "SCT Trivandrum",
    "roomType": "",
    "price": "6000",
    "distance": "less than 1 km",
    "gender": "male",
    "contact": {
      "phone": "9446186940",
      "whatsapp": "919446186940"
    },
    "rating": "",
    "amenities": [],
    "images": [
      "1.jpg",
      "2.jpg",
      "3.jpg"
    ],
    "gmap": "",
    "address": "Kairali Garden, Viswambharan Road, Pappanamcode"
  }
]

# Create the zip file
with zipfile.ZipFile('hostels.zip', 'w', zipfile.ZIP_DEFLATED) as zipf:
    for hostel in hostel_data:
        # Sanitize the hostel name for the folder name
        folder_name_raw = hostel["name"].split(',')[0].lower().replace("'", "").replace(' ', '_').replace('.', '').replace('(', '').replace(')', '')
        folder_name = f"{folder_name_raw}SCTCE/"

        # Convert the dictionary to a JSON formatted string
        json_string = json.dumps(hostel, indent=2)

        # Define the file path within the zip archive
        file_path = os.path.join(folder_name, "data.json")

        # Write the JSON string to the file within the zip archive
        zipf.writestr(file_path, json_string)

print("File 'hostels.zip' created successfully in your current directory.")