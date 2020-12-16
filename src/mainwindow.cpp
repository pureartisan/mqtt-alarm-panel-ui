#include "mainwindow.h"
#include "ui_mainwindow.h"

#include <QDateTime>
#include <QString>
#include <QTimer>
#include <QDebug>
#include <QApplication>
#include <QScreen>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    this->setWindowState(Qt::WindowFullScreen);
    this->updateArmButtons();

    this->updateCurrentDateAndTime();
    this->startClock();

    // DEBUG ONLY
    QRect rec = QApplication::screens().first()->geometry();
    qDebug() << "Screen";
    qDebug() << rec;
}

MainWindow::~MainWindow()
{
    disconnect(clockTimer);
    delete clockTimer;
    delete ui;
}

void MainWindow::updateArmButtons()
{
    ui->btn_disarm->setVisible(false);
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

void MainWindow::hideCursor()
{
    cursor.setPos(0, 0);
}

void MainWindow::on_btn_key_1_clicked()
{
    // TODO
    hideCursor();
}

void MainWindow::on_btn_key_2_clicked()
{
    // TODO
    hideCursor();
}
