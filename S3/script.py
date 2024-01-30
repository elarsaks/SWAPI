import os
import shutil

# The directory containing your character folders
base_directory = "./"

# The directory where you want to save the first image from each folder
output_directory = os.path.join(base_directory, "characters")

# Create the output directory if it doesn't exist
if not os.path.exists(output_directory):
    os.makedirs(output_directory)

# Loop through each folder in the base directory
for folder_name in os.listdir(base_directory):
    folder_path = os.path.join(base_directory, folder_name)
    
    # Check if it's a directory
    if os.path.isdir(folder_path):
        # Get a list of files in the directory
        files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
        files.sort()  # Sort the files to ensure consistency in which file is considered "first"
        
        # Proceed if there are any files in the folder
        if files:
            # Assuming the first file is the image you want to rename and move
            first_image = files[0]
            first_image_path = os.path.join(folder_path, first_image)
            
            # Define the new path with the folder (character) name
            new_image_name = f"{folder_name}{os.path.splitext(first_image)[1]}"
            new_image_path = os.path.join(output_directory, new_image_name)
            
            # Move and rename the first image to the new directory
            shutil.move(first_image_path, new_image_path)
            print(f"Moved: {first_image} to {new_image_path}")
