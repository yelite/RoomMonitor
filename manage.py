#coding=utf-8

import sys

from db import engine
from model import Base


def create():
    Base.metadata.create_all(engine)


if __name__ == '__main__':
    try:
        cmd = sys.argv[1]
    except IndexError:
        cmd = None

    if cmd == 'create':
        create()
    else:
        print('support method: create')
