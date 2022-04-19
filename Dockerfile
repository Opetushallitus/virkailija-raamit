FROM nginx
COPY nginx.local.conf /etc/nginx/nginx.conf
COPY src/main/static/build /usr/share/nginx/html