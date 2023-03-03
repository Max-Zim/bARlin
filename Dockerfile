FROM node:16.18.0
WORKDIR /app
COPY ./backend ./backend 
COPY ./frontend ./frontend
COPY ./extra_files ./extra_files

WORKDIR /app/backend
RUN yarn install
ADD ./backend .
CMD ["yarn", "start"]
