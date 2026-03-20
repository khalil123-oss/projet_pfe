FROM python:3.14-slim
EXPOSE 8000

RUN apt-get update && apt-get install -y \
    pkg-config \
    default-libmysqlclient-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN python -m pip install -r requirements.txt

WORKDIR /app
COPY . /app

CMD ["sh", "-c", "until python -c \"import MySQLdb; MySQLdb.connect(host='$DB_HOST', user='$DB_USER', passwd='$DB_PASSWORD', db='$DB_NAME')\" 2>/dev/null; do echo 'Waiting for DB...' && sleep 3; done && python manage.py migrate --noinput && python manage.py runserver 0.0.0.0:8000"]