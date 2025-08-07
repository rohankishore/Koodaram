import sys
import os
import json
from PyQt6.QtWidgets import (
    QApplication, QWidget, QLabel, QLineEdit, QTextEdit, QPushButton,
    QVBoxLayout, QMessageBox
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

        # Inputs for each JSON key
        self.inputs = {}

        # Default values for pre-filling
        default_values = {
            "name": "Sample Hostel",
            "location": "",
            "college": "CUCEK",
            "roomType": "-",
            "price": "",
            "distance": "400m",
            "gender": "female",
            "contact_phone": "",
            "contact_whatsapp": "91",
            "amenities (comma-separated)": "WiFi, Study Space, CCTV, Food",
            "images (comma-separated)": "1.jpg,2.jpg,3.jpg",
            "rating": "",
            "gmap": ""
        }

        fields = [
            "name", "location", "college", "roomType", "price",
            "distance", "gender", "contact_phone", "contact_whatsapp",
            "amenities (comma-separated)", "images (comma-separated)", "gmap", "rating"
        ]

        for field in fields:
            label = QLabel(field.replace("_", " ").capitalize() + ":")
            if "amenities" in field or "images" in field or "gmap" in field:
                input_widget = QTextEdit()
                input_widget.setFixedHeight(50)
                input_widget.setPlainText(default_values.get(field, ""))
            else:
                input_widget = QLineEdit()
                input_widget.setText(default_values.get(field, ""))

            self.inputs[field] = input_widget
            layout.addWidget(label)
            layout.addWidget(input_widget)

        # Save button
        self.save_button = QPushButton("💾 Create Folder & Save data.json")
        self.save_button.clicked.connect(self.save_json)

        layout.addWidget(self.folder_label)
        layout.addWidget(self.folder_input)
        layout.addWidget(self.save_button)

        self.setLayout(layout)

    def save_json(self):
        folder = self.folder_input.text().strip()
        if not folder:
            QMessageBox.warning(self, "Error", "Folder name is required.")
            return

        try:
            os.makedirs(folder, exist_ok=True)

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
                "images": [i.strip() for i in self.inputs["images (comma-separated)"].toPlainText().split(",") if i.strip()],
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
