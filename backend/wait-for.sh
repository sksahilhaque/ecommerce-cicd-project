#!/bin/sh

# Use env vars or fallback defaults
: "${HOST:=mysql}"
: "${PORT:=3306}"

echo "⏳ Waiting for MySQL at $HOST:$PORT..."

while :
do
  nc -z "$HOST" "$PORT" > /dev/null 2>&1
  result=$?

  if [ $result -eq 0 ]; then
    echo "✅ MySQL is up. Starting Spring Boot app..."
    break
  fi

  echo "⏱️  Still waiting for MySQL at $HOST:$PORT..."
  sleep 2
done

exec java -jar app.jar
