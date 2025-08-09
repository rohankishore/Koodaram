import zipfile
import json
import os

# [cite_start]Data extracted from the ladies_hostel_new.pdf [cite: 2]
hostel_data = [
    {"name": "Aiswarya hostel, njanjaakkal, pulincunno", "phone": "9142246206"},
    {"name": "Anija's hostel, padithara house, pulincunnoo", "phone": "8157987895"},
    {"name": "Anju home stay, njaanjaakkal, pulincunnoo", "phone": "9539997672"},
    {"name": "Arikudy ladies hostel, near circle office, pulincunnoo", "phone": "9447553423"},
    {"name": "Babus Hostel, Opposite to Engineering College", "phone": "8848476768, 7025066850"},
    {"name": "K.M Hostel", "phone": "7594025753"},
    {"name": "Manalayil", "phone": "8376945147, 7306791235"},
    {"name": "Muppathilchira Girls Hostel", "phone": "9656499882, 9497634830"},
    {"name": "Padisserry home stay, opposite to Engg college", "phone": "9061815862"},
    {"name": "Punnoor hostel", "phone": "9745069107"},
    {"name": "Radhamadhavam, Near Engg College", "phone": "9349524770, 7561824770"},
    {"name": "Raj Nivas", "phone": "9447500490"},
    {"name": "S H Hostel", "phone": "8281748079"},
    {"name": "SS Hostel", "phone": "9995051567"},
    {"name": "Sarang", "phone": "8078523371"},
    {"name": "Vithuvattickal", "phone": "9447500633"},
    {"name": "College Girls Hostel (Petals Hostel)", "phone": "04772707500"},
]

# Create the zip file
with zipfile.ZipFile('hostels.zip', 'w', zipfile.ZIP_DEFLATED) as zipf:
    for hostel in hostel_data:
        # Sanitize the hostel name for the folder name
        folder_name_raw = hostel["name"].split(',')[0].lower().replace(' ', '_').replace('.', '').replace('(',
                                                                                                          '').replace(
            ')', '')
        folder_name = f"{folder_name_raw}CUCEK/"

        # Get the primary phone number for WhatsApp
        primary_phone = hostel["phone"].split(',')[0].strip()
        whatsapp_number = f"91{primary_phone}"

        # Create the JSON data structure
        json_data = {
            "name": hostel["name"],
            "location": "",
            "college": "CUCEK",
            "roomType": "",
            "price": "",
            "distance": "",
            "gender": "female",
            "contact": {
                "phone": hostel["phone"],
                "whatsapp": whatsapp_number
            },
            "rating": "",
            "amenities": [],
            "images": [],
            "gmap": ""
        }

        # Convert the dictionary to a JSON formatted string
        json_string = json.dumps(json_data, indent=2)

        # Define the file path within the zip archive
        file_path = os.path.join(folder_name, "data.json")

        # Write the JSON string to the file within the zip archive
        zipf.writestr(file_path, json_string)

print("File 'hostels.zip' created successfully in your current directory.")