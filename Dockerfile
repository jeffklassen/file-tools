FROM node

## Uncomment the following line if you want to expose ports
#EXPOSE 3000 

WORKDIR /app

RUN npm install -g babel-cli && npm install -g babel-preset-es2015

ADD package.json /app

RUN npm install

RUN apt update && apt install tesseract-ocr imagemagick ghostscript poppler-utils  -y

CMD npm run server
