#include "mainwindow.h"
#include "ui_mainwindow.h"

#include <QDateTime>
#include <QString>
#include <QTimer>
#include <QDebug>
#include <QApplication>
#include <QDesktopWidget>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    this->setWindowState(Qt::WindowFullScreen);
    this->updateCurrentDateAndTime();
    this->startClock();

    QRect rec = QApplication::desktop()->screenGeometry();
    qDebug() << "Width" + QString(rec.width());
    qDebug() << "Height" + QString(rec.height());
}

MainWindow::~MainWindow()
{
    disconnect(clockTimer);
    delete clockTimer;
    delete ui;
}

void MainWindow::startClock()
{
    clockTimer = new QTimer(this);
    connect(clockTimer, &QTimer::timeout, this, &MainWindow::updateCurrentDateAndTime);
    clockTimer->start(1000);
}

void MainWindow::updateCurrentDateAndTime()
{
    QDateTime dateTime = dateTime.currentDateTime();
    QString dateTimeString = dateTime.toString("yyyy-MM-dd_hh-mm-ss");
    this->ui->lbl_current_date->setText(dateTime.toString("yyyy-MM-dd"));
    this->ui->lbl_current_time->setText(dateTime.toString("hh-mm-ss"));
}
