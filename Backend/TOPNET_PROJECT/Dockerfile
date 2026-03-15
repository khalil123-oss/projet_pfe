# For more information, please refer to https://aka.ms/vscode-docker-python
FROM python:3.14-slim

EXPOSE 8000
RUN apt-get update && apt-get install -y \
    pkg-config \
    default-libmysqlclient-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*
# Install pip requirements
COPY requirements.txt .
RUN python -m pip install -r requirements.txt

WORKDIR /app
COPY . /app

# Creates a non-root user with an explicit UID and adds permission to access the /app folder
# For more info, please refer to https://aka.ms/vscode-docker-python-configure-containers


# During debugging, this entry point will be overridden. For more information, please refer to https://aka.ms/vscode-docker-python-debug
CMD ["sh", "-c", "until python -c \"import MySQLdb; MySQLdb.connect(host='db', user='topnet_user', passwd='123', db='topnet_db')\" 2>/dev/null; do echo 'Waiting for DB...' && sleep 3; done && echo 'DB ready!' && python manage.py migrate --noinput && python manage.py runserver 0.0.0.0:8000"]
      

