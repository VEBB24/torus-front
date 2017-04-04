FROM nginx

COPY conf/torus-frontend.nginx /etc/nginx/conf.d/default.conf

EXPOSE 80
