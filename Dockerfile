FROM nginx
COPY nginx.local-virkailija-raamit.conf /etc/nginx/nginx.conf
COPY src/main/static/build /usr/share/nginx/html