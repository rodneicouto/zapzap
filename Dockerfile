#https://itnext.io/docker-development-environment-angular-full-guide-a38ee34fb651
#https://wwebjs.dev/guide/#installation 
#https://github.com/puppeteer/puppeteer/issues/379

FROM node:21-alpine

RUN set -x \
    \
    # Add the packages
    && apk add --no-cache \
    udev \
    ttf-freefont \
    curl make gcc g++  \
    linux-headers \
    python3 py3-pip \
    binutils-gold gnupg \
    libstdc++ nss chromium \
    \
     # Do some cleanup
    && rm -rf /usr/include \
    && rm -rf /var/cache/apk/* /root/.node-gyp /usr/share/man /tmp/* \
    && echo

WORKDIR /app

CMD npm start