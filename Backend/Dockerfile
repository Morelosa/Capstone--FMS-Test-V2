FROM python:3.10

COPY ./requirements.txt /app/requirements.txt

WORKDIR /app

RUN pip install --upgrade setuptools pip
RUN pip install opencv-python
RUN pip install opencv_contrib_python
RUN pip install -r requirements.txt

COPY . .

EXPOSE 5000

ENV FLASK_APP=runner.py

CMD ["flask", "run", "--host", "0.0.0.0"]

#opencv_contrib_python==4.8.1.78
#opencv_python==4.8.1.78
