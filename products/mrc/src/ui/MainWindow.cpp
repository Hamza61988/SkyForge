#include "MainWindow.h"
#include <QPushButton>
#include <QGridLayout>
#include <QVBoxLayout>
#include <QLabel>
#include <QMouseEvent>
#include <QGraphicsDropShadowEffect>

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent),
      leftButtons({"MENU", "A-A", "A-G", "SNSR", "WPN"}),
      rightButtons({"R1", "R2", "R3", "R4", "R5"}),
      bottomButtons({"B1", "B2", "B3", "B4"})
{
    setWindowFlags(Qt::FramelessWindowHint);
    setFixedSize(600, 540);

    QWidget *centralWidget = new QWidget(this);
    setCentralWidget(centralWidget);

    QGridLayout *layout = new QGridLayout(centralWidget);
    layout->setSpacing(0);
    layout->setContentsMargins(10, 10, 10, 10);

    QLabel *displayScreen = new QLabel(this);
    displayScreen->setStyleSheet("background-color: #16191c; border-radius: 15px;");
    displayScreen->setFixedSize(460, 360);
    layout->addWidget(displayScreen, 1, 1, 5, 5, Qt::AlignCenter);

    QString buttonStyle = "QPushButton {"
                          "background-color: #2d2d2d; "
                          "color: white; "
                          "font-size: 16px; "
                          "border-radius: 10px; "
                          "border: 2px solid #1b1b1b; "
                          "padding: 5px; "
                          "} "
                          "QPushButton:pressed {"
                          "background-color: #292929; "
                          "} "
                          "QPushButton:hover {"
                          "background-color: #333333; "
                          "}";

    QString cylinderStyleHorizontal = "QLabel {"
                                      "border-radius: 10px; "
                                      "min-width: 40px; "
                                      "min-height: 10px; "
                                      "background: qlineargradient(spread:pad, x1:0, y1:0, x2:1, y2:1, "
                                      "stop:0 #3a3a3a, stop:0.5 #222222, stop:1 #111111); "
                                      "border: 2px solid #0d0d0d; "
                                      "}";

    QString cylinderStyleVertical = "QLabel {"
                                    "border-radius: 10px; "
                                    "min-width: 10px; "
                                    "min-height: 40px; "
                                    "background: qlineargradient(spread:pad, x1:0, y1:0, x2:1, y2:1, "
                                    "stop:0 #3a3a3a, stop:0.5 #222222, stop:1 #111111); "
                                    "border: 2px solid #0d0d0d; "
                                    "}";

    QHBoxLayout *bottomLayout = new QHBoxLayout();
    bottomLayout->setSpacing(5);
    bottomLayout->setContentsMargins(0, 0, 0, 0);

    for (int i = 0; i < bottomButtons.size(); i++)
    {
        QPushButton *btn = new QPushButton(bottomButtons[i], this);
        btn->setStyleSheet(buttonStyle);
        btn->setFixedSize(60, 60);
        bottomLayout->addWidget(btn);

        if (i < bottomButtons.size() - 1)
        {
            QLabel *cylinder = new QLabel(this);
            cylinder->setStyleSheet(cylinderStyleVertical);
            cylinder->setFixedSize(10, 40);
            bottomLayout->addWidget(cylinder);
        }
    }
    layout->addLayout(bottomLayout, 6, 1, 1, 5, Qt::AlignCenter);

    QVBoxLayout *leftLayout = new QVBoxLayout();
    leftLayout->setSpacing(8);
    leftLayout->setAlignment(Qt::AlignVCenter);
    leftLayout->addSpacing(20);

    for (int i = 0; i < leftButtons.size(); i++)
    {
        QPushButton *btn = new QPushButton(leftButtons[i], this);
        btn->setStyleSheet(buttonStyle);
        btn->setFixedSize(60, 60);
        leftLayout->addWidget(btn);

        if (i < leftButtons.size() - 1)
        {
            QLabel *cylinder = new QLabel(this);
            cylinder->setStyleSheet(cylinderStyleHorizontal);
            cylinder->setFixedSize(40, 10);
            leftLayout->addWidget(cylinder);
        }
    }
    layout->addLayout(leftLayout, 1, 0, 5, 1);

    QVBoxLayout *rightLayout = new QVBoxLayout();
    rightLayout->setSpacing(8);
    rightLayout->setAlignment(Qt::AlignVCenter);
    rightLayout->addSpacing(20);

    for (int i = 0; i < rightButtons.size(); i++)
    {
        QPushButton *btn = new QPushButton(rightButtons[i], this);
        btn->setStyleSheet(buttonStyle);
        btn->setFixedSize(60, 60);
        rightLayout->addWidget(btn);

        if (i < rightButtons.size() - 1)
        {
            QLabel *cylinder = new QLabel(this);
            cylinder->setStyleSheet(cylinderStyleHorizontal);
            cylinder->setFixedSize(40, 10);
            rightLayout->addWidget(cylinder);
        }
    }
    layout->addLayout(rightLayout, 1, 6, 5, 1);

    QLabel *header = new QLabel("MRC for IVAO", this);
    header->setStyleSheet("color: white; font-size: 16px;");
    header->setAlignment(Qt::AlignCenter);
    layout->addWidget(header, 0, 1, 1, 5, Qt::AlignCenter);
}

MainWindow::~MainWindow() {}

void MainWindow::mousePressEvent(QMouseEvent *event)
{
    if (event->button() == Qt::LeftButton)
    {
        dragPosition = event->globalPosition().toPoint() - frameGeometry().topLeft();
        event->accept();
    }
}

void MainWindow::mouseMoveEvent(QMouseEvent *event)
{
    if (event->buttons() & Qt::LeftButton)
    {
        move(event->globalPosition().toPoint() - dragPosition);
        event->accept();
    }
}

void MainWindow::mouseReleaseEvent(QMouseEvent *event)
{
    event->accept();
}