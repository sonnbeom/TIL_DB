package com.example.study_jvm.visibility;

public class VisibilityTest {

    private static boolean stopRequested ;
//    private static volatile boolean stopRequested ;

    public static void main(String[] args) throws InterruptedException {
        Thread backGroundThread = new Thread(() -> {
            int i = 0;
            while(!stopRequested){
                i++;
            }
            System.out.println("루프 종료 됨 , i = " + i);
        });
        backGroundThread.start();
        //backgroundThread.start() 호출 순간 실제로는 새로운 스레드가 만들어지고 실행됩니다.
        // start를 호출한 메인 스레드는 그 코드가 다 끝날 때까지 기다리지 않고 다음 줄로 넘어갑니다.
        //
        Thread.sleep(1000);
        // 메인 스레드에서 sleep 하는 동안 backGroundThread는 계속 돌아갑니다.
        //start() 대신 run()을 직접 호출하면 새 스레드가 안 생기고 그냥 메인 스레드가 그 코드를 순서대로 실행해버립니다.
        stopRequested = true;
        // backgroundThread를 실행하는 스레드와 stopRequested = true를 실행하는 스레드는 서로 다른 스레드이며
        // 각자 다른 cpu 코어에서 각자의 캐시를 들고 독립적으로 동작합니다.
        System.out.println("메인 스레드: stopRequested = true 로 설정 완료");
    }

}
