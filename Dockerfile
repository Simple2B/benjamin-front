FROM node:alpine
WORKDIR /app
COPY package.json yarn.lock ./
# install dependencies
RUN yarn install --frozen-lockfile
COPY . .
RUN sh update_action_size_limit.sh

EXPOSE 3000

ENV PORT 3000
ENV BACKEND_URL=http://app

CMD ["sh", "start_next.sh"]