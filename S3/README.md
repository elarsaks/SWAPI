# Images

I couldn't find any good APIs for the images, but I discovered a Kaggle dataset.
It was a 1.4GB collection of character images, sorted into folders named after the characters.
I used a Python script from GPT to retrieve the first image from each folder and rename the image after the folder. Then, I uploaded those images into an S3 bucket and used them from there.
Unfortunately, it turned out that this dataset only had images of 51 characters, so I defaulted back to a logo for the missing images.
