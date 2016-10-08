FROM node

EXPOSE 3000

RUN apt update && apt install tesseract-ocr imagemagick ghostscript poppler-utils  -y
WORKDIR /app
ADD . /app
RUN npm install

CMD ["npm", "start"]