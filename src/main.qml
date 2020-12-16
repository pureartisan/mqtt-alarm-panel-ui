import QtQuick 2.11
import QtQuick.Window 2.11
import QtQuick.Controls 2.4
import QtQuick.Controls.Material 2.4

Window {
    visible: true
    width: 1280
    height: 720
    title: qsTr("Hello World")
    visibility: Window.FullScreen

    RoundButton {
        id: addAlarmButton
        text: "+"
        anchors.bottom: 0
        anchors.bottomMargin: 8
        anchors.horizontalCenter: parent.horizontalCenter
    }
}

