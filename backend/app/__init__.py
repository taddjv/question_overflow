from flask import Flask,render_template

from .config import Configuration


app = Flask(__name__)
app.config.from_object(Configuration)

@app.route("/")
def main():
    return render_template("main_page.html")
