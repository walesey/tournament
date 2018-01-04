from node:6.8

COPY ./ /opt/app/
WORKDIR /opt/app/

RUN npm i -q
RUN npm run build

CMD npm run start