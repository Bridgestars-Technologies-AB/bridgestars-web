FROM laravelphp/vapor:php83-arm

RUN apk --update add icu-data-full

RUN pecl install excimer

COPY ./php.ini /usr/local/etc/php/conf.d/overrides.ini

# Place application in Lambda application directory...
COPY . /var/task
