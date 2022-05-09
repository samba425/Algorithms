# Utility function to print a matrix
def printMatrix(matrix,n):
    arra = []
    for i in range(1,n+1):
        index=0
        t=0
        for j in range(0,i):
            t += matrix[j][-i+index]
            index +=1
        arra.append(t)
   
    for a in range(1,n):
        index=0
        t1=0
        for j in range(a,n):
            t1 += matrix[j][index]
            index +=1
        arra.append(t1)
        
    print('--',arra)

# Driver Code
M =[[1,2,3,4,5],[9,6,3,8,6],[1,3,6,8,4],[3,7,4,9,0],[7,5,3,4,5]]
printMatrix(M,5)