import sys
import os
import json
import urllib.request

from PyQt6.QtWidgets import (
    QApplication, QWidget, QLabel, QLineEdit, QTextEdit, QPushButton,
    QVBoxLayout, QHBoxLayout, QMessageBox, QListWidget, QListWidgetItem, QInputDialog
)


class HostelForm(QWidget):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Hostel Data Entry Form")
        self.setMinimumWidth(600)

        layout = QVBoxLayout()

        # Folder name input
        self.folder_label = QLabel("📁 Folder Name:")
        self.folder_input = QLineEdit()

        layout.addWidget(self.folder_label)
        layout.addWidget(self.folder_input)

        # Inputs for each JSON key
        self.inputs = {}

        # Default values
        default_values = {
            "name": "Sample Hostel",
            "location": "Thrissur",
            "college": "GEC Thrissur",
            "roomType": "-",
            "price": "",
            "distance": "500m",
            "gender": "male",
            "contact_phone": "",
            "contact_whatsapp": "+91 ",
            "amenities (comma-separated)": "WiFi, Parking, Laundry, Food",
            "gmap": "",
            "rating": ""
        }

        fields = [
            "name", "location", "college", "roomType", "price",
            "distance", "gender", "contact_phone", "contact_whatsapp",
            "amenities (comma-separated)", "gmap", "rating"
        ]

        for field in fields:
            label = QLabel(field.replace("_", " ").capitalize() + ":")
            if "amenities" in field or "gmap" in field:
                input_widget = QTextEdit()
                input_widget.setFixedHeight(50)
                input_widget.setPlainText(default_values.get(field, ""))
            else:
                input_widget = QLineEdit()
                input_widget.setText(default_values.get(field, ""))
            self.inputs[field] = input_widget
            layout.addWidget(label)
            layout.addWidget(input_widget)

        # Images List Widget with buttons
        layout.addWidget(QLabel("Images:"))
        self.images_list = QListWidget()
        layout.addWidget(self.images_list)

        add_image_button = QPushButton("➕ Add Image URL/Path")
        add_image_button.clicked.connect(self.add_image)
        layout.addWidget(add_image_button)

        # Save button
        self.save_button = QPushButton("💾 Create Folder & Save data.json")
        self.save_button.clicked.connect(self.save_json)
        layout.addWidget(self.save_button)

        self.setLayout(layout)

    def add_image(self):
        text, ok = QInputDialog.getText(self, "Add Image", "Enter image URL or local path:")
        if ok and text.strip():
            self.images_list.addItem(text.strip())

    def save_json(self):
        folder = self.folder_input.text().strip()
        if not folder:
            QMessageBox.warning(self, "Error", "Folder name is required.")
            return

        try:
            os.makedirs(folder, exist_ok=True)

            # Handle images: download if needed, rename all to 1.jpg, 2.jpg...
            image_names = []
            for index in range(self.images_list.count()):
                source = self.images_list.item(index).text().strip()
                target_name = f"{index + 1}.jpg"
                target_path = os.path.join(folder, target_name)

                if source.lower().startswith("http"):
                    try:
                        urllib.request.urlretrieve(source, target_path)
                    except Exception as e:
                        QMessageBox.warning(self, "Warning", f"Failed to download {source}: {e}")
                        continue
                else:
                    if os.path.isfile(source):
                        with open(source, "rb") as fsrc, open(target_path, "wb") as fdst:
                            fdst.write(fsrc.read())
                    else:
                        QMessageBox.warning(self, "Warning", f"Local file not found: {source}")
                        continue

                image_names.append(target_name)

            # Build JSON structure
            data = {
                "name": self.inputs["name"].text().strip(),
                "location": self.inputs["location"].text().strip(),
                "college": self.inputs["college"].text().strip(),
                "roomType": self.inputs["roomType"].text().strip(),
                "price": self.inputs["price"].text().strip(),
                "distance": self.inputs["distance"].text().strip(),
                "gender": self.inputs["gender"].text().strip(),
                "contact": {
                    "phone": self.inputs["contact_phone"].text().strip(),
                    "whatsapp": self.inputs["contact_whatsapp"].text().strip(),
                },
                "rating": self.inputs["rating"].text().strip(),
                "amenities": [a.strip() for a in self.inputs["amenities (comma-separated)"].toPlainText().split(",") if a.strip()],
                "images": image_names,
                "gmap": self.inputs["gmap"].toPlainText().strip()
            }

            with open(os.path.join(folder, "data.json"), "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2, ensure_ascii=False)

            QMessageBox.information(self, "Success", f"Data saved to {folder}/data.json")

        except Exception as e:
            QMessageBox.critical(self, "Error", f"Failed to save data:\n{str(e)}")


if __name__ == "__main__":
    app = QApplication(sys.argv)
    window = HostelForm()
    window.show()
    sys.exit(app.exec())
