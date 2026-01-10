FROM nginx:alpine

# hapus default config
RUN rm -rf /usr/share/nginx/html/*

# copy static files
COPY . /usr/share/nginx/html

EXPOSE 80
