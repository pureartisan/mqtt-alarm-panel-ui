#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QTimer>
#include <QCursor>

QT_BEGIN_NAMESPACE
namespace Ui { class MainWindow; }
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

private slots:
    void on_btn_key_1_clicked();

    void on_btn_key_2_clicked();

private:
    Ui::MainWindow *ui;
    QTimer *clockTimer;
    QCursor cursor;

    void startClock();
    void updateCurrentDateAndTime();
    void updateArmButtons();
    void hideCursor();
};
#endif // MAINWINDOW_H
