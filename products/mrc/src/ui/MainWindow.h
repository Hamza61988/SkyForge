#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <QStringList>
#include <QMouseEvent> // Add this for mouse event handling
#include <QPoint> // Add this for QPoint usage

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

protected:
    void mousePressEvent(QMouseEvent *event) override;
    void mouseMoveEvent(QMouseEvent *event) override;
    void mouseReleaseEvent(QMouseEvent *event) override;

private:
    QPoint dragPosition;  // Declare the QPoint variable to store the mouse position
    const QStringList leftButtons;
    const QStringList rightButtons;
    const QStringList bottomButtons;
};

#endif // MAINWINDOW_H
