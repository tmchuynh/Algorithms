import java.util.Arrays;

class dijkstra {

    private static final int V = 8;

    public static void main(String[] args) {

        int[][] graph = new int[][] {
                { 0, 4, 0, 0, 5, 1, 3, 8 },
                { 4, 0, 8, 4, 2, 0, 0, 11 },
                { 0, 8, 0, 7, 0, 4, 0, 0 },
                { 0, 0, 7, 0, 9, 14, 0, 0 },
                { 0, 1, 3, 9, 0, 10, 0, 0 },
                { 9, 0, 4, 14, 10, 0, 2, 0 },
                { 0, 0, 1, 6, 0, 2, 0, 1 },
                { 8, 11, 0, 1, 6, 0, 1, 0 }
        };
        dijkstra t = new dijkstra();

        t.dijkstraAlgorithm(graph, 0);
    }

    int getMinDistanceVertex(int[] dist, boolean[] sptSet) {
        int min = Integer.MAX_VALUE;
        int minIndex = -1;

        for (int v = 0; v < V; v++) {
            if (!sptSet[v] && dist[v] <= min) {
                min = dist[v];
                minIndex = v;
            }
        }

        return minIndex;
    }

    void printSolution(int[] dist) {
        System.out.println("Vertex \t Distance from Source");
        for (int i = 0; i < V; i++) {
            System.out.println(i + " \t\t " + dist[i]);
        }
    }

    void dijkstraAlgorithm(int[][] graph, int src) {
        int[] dist = new int[V];
        boolean[] sptSet = new boolean[V];

        Arrays.fill(dist, Integer.MAX_VALUE);
        Arrays.fill(sptSet, false);

        dist[src] = 0;

        for (int count = 0; count < V - 1; count++) {
            int u = getMinDistanceVertex(dist, sptSet);

            sptSet[u] = true;

            for (int v = 0; v < V; v++) {
                if (!sptSet[v] && graph[u][v] != 0 && dist[u] != Integer.MAX_VALUE &&
                        dist[u] + graph[u][v] < dist[v]) {
                    dist[v] = dist[u] + graph[u][v];
                }
            }
        }

        printSolution(dist);
    }
}
