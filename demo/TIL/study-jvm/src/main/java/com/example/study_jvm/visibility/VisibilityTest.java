package com.example.study_jvm.visibility;

public class VisibilityTest {

    private static boolean stopRequested ;

    public static void main(String[] args) throws InterruptedException {
        Thread backGroundThread = new Thread(() -> {
            int i = 0;
            while(!stopRequested){
                i++;
            }
            System.out.println("루프 종료 됨 , i = " + i);
        });
        backGroundThread.start();

        Thread.sleep(1000);
        stopRequested = true;
        System.out.println("메인 스레드: stopRequested = true 로 설정 완료");
    }

}
