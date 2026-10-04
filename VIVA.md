# TOWER OF HANOI – COLLEGE VIVA PREPARATION GUIDE
## 20 Likely Questions and Answers for the Viva Examination

---

### Q1. What is Artificial Intelligence?
**Answer:**  
Artificial Intelligence (AI) is the branch of computer science focused on building systems capable of performing tasks that typically require human intelligence. These tasks include problem-solving, logical reasoning, pattern recognition, learning, and planning. In this project, AI is demonstrated through **symbolic reasoning and state-space problem-solving**.

---

### Q2. What is Prolog?
**Answer:**  
Prolog stands for **PROgramming in LOGic**. It is a high-level declarative programming language developed in the 1970s based on formal logic (specifically First-Order Predicate Calculus and Horn clauses). It is one of the foundational languages of symbolic Artificial Intelligence and expert systems.

---

### Q3. Why did you use Prolog for this project instead of just JavaScript or Python?
**Answer:**  
My professor and curriculum specifically required Prolog because it demonstrates **declarative problem solving**. In imperative languages like JavaScript, the programmer must specify every step of *how* to solve the problem using loops and mutable memory. In Prolog, we specify *what* the problem relationships and transition rules are, and Prolog's built-in inference engine deduces the solution. SWI-Prolog is the actual AI solving engine, while JavaScript is used purely for UI presentation and animation.

---

### Q4. What is logic programming?
**Answer:**  
Logic programming is a programming paradigm where program execution is treated as mathematical deduction over a set of logical sentences. A logic program consists of **facts** and **rules**. When a user poses a **query**, the system attempts to prove the query by matching terms (unification) and searching through logical clauses (resolution).

---

### Q5. What is a predicate in Prolog?
**Answer:**  
A predicate represents an $n$-ary relation between entities. It consists of a name followed by arguments in parentheses. For example, `solve_hanoi(N, Moves)` is a 2-arity predicate (denoted `solve_hanoi/2`) that defines the relationship between the number of disks $N$ and the resulting sequence of moves $Moves$.

---

### Q6. What is a fact in Prolog?
**Answer:**  
A fact is an unconditional assertion that is always true in the knowledge base. It is written as a clause with no body, followed by a period. In our program:
```prolog
hanoi(0, _, _, _, []).
```
is a base fact stating that moving 0 disks requires an empty list of moves.

---

### Q7. What is a rule in Prolog?
**Answer:**  
A rule is a conditional statement (a Horn clause) of the form:
$$\text{Head} \text{ :- } \text{Body.}$$
It means: *The Head is true if all goals in the Body are true.* For example:
```prolog
hanoi(N, From, To, Aux, Moves) :-
    N > 1,
    N1 is N - 1,
    hanoi(N1, From, Aux, To, M1),
    ...
```
This states that moving $N$ disks is valid *if* we can recursively solve the subproblems.

---

### Q8. What is recursion? How is it used here?
**Answer:**  
Recursion is a computational method where a function or predicate defines its solution in terms of simpler instances of itself, continuing until a base terminating condition is met. In Tower of Hanoi, moving $N$ disks is defined recursively by moving $(N-1)$ disks to an auxiliary tower, moving the largest disk, and then moving the $(N-1)$ disks to the target.

---

### Q9. What is backtracking in Prolog?
**Answer:**  
Backtracking is Prolog’s automatic search mechanism. When a goal fails or when alternative solutions are requested, Prolog undoes its most recent variable bindings and tries alternative clauses or choices in the search tree. In state-space exploration, backtracking allows the system to retreat from dead ends and pursue alternative paths.

---

### Q10. What is the initial state in this problem?
**Answer:**  
The initial state is represented as:
```prolog
state([1, 2, ..., N], [], [])
```
Where Tower A holds all $N$ disks ordered from smallest (disk 1 at top) to largest (disk $N$ at base), and Towers B and C are empty.

---

### Q11. What is the goal state?
**Answer:**  
The goal state is:
```prolog
state([], [], [1, 2, ..., N])
```
Where Towers A and B are empty, and Tower C holds all $N$ disks in the identical valid order.

---

### Q12. What are the actions / operators?
**Answer:**  
The actions are legal transitions of the form `move(From, To, Disk)` subject to two invariants:
1. Only the topmost disk of `From` can be removed.
2. The destination tower `To` must either be empty or have a top disk larger than `Disk`.

---

### Q13. How does the Tower of Hanoi problem work?
**Answer:**  
It uses a **divide-and-conquer** strategy:
1. Move the top $N-1$ disks from Source (A) to Auxiliary (B) using Destination (C) as temporary storage.
2. Move the largest disk $N$ directly from Source (A) to Destination (C).
3. Move the $N-1$ disks from Auxiliary (B) to Destination (C) using Source (A) as temporary storage.

---

### Q14. Why is the solution mathematically optimal?
**Answer:**  
The recurrence relation for the minimum number of moves is:
$$T(N) = 2T(N-1) + 1, \quad T(1) = 1$$
Solving this recurrence gives:
$$T(N) = 2^N - 1$$
Because disk $N$ cannot move until all $(N-1)$ disks above it are removed to another peg (taking $T(N-1)$ moves), and after moving disk $N$ (1 move), those $(N-1)$ disks must be moved again on top of it ($T(N-1)$ moves), no valid algorithm can solve the problem in fewer than $2^N - 1$ moves. Prolog generates exactly this optimal sequence.

---

### Q15. What is the time complexity?
**Answer:**  
The time complexity is $\mathcal{O}(2^N)$ (exponential time). Every additional disk doubles the number of operations:
- $N = 3 \implies 7$ moves
- $N = 4 \implies 15$ moves
- $N = 5 \implies 31$ moves
- $N = 10 \implies 1023$ moves

---

### Q16. What is the space complexity?
**Answer:**  
The auxiliary space complexity is $\mathcal{O}(N)$ (linear space), corresponding to the maximum depth of the recursive call stack in Prolog.

---

### Q17. How does React communicate with Prolog in this architecture?
**Answer:**  
1. When the user clicks **"ASK PROLOG AI"**, React sends an HTTP `POST` request to `/api/solve` with `{ "disks": N }`.
2. The Node.js Express server invokes the native SWI-Prolog binary via `child_process.exec()`:
   ```bash
   swipl -q -s prolog/hanoi.pl -g "solve_and_print_json(N), halt."
   ```
3. Prolog runs the `solve_hanoi/2` predicate, formats the move list into JSON, and prints to stdout.
4. Express parses the stdout and returns the JSON payload to React.
5. React sequentially updates the tower states to animate the solution.

---

### Q18. Why is Prolog suitable for this problem?
**Answer:**  
Prolog is inherently recursive and declarative. Problems that can be formulated cleanly as inductive mathematical rules (base case and inductive step) map directly onto Prolog clauses with zero boilerplate code.

---

### Q19. Is this Machine Learning?
**Answer:**  
No. This is **Classical / Symbolic Artificial Intelligence (GOFAI - Good Old-Fashioned AI)**. Machine learning learns statistical patterns from training datasets using weights and gradient descent. In contrast, symbolic AI uses formal logic, exact rules, state-space representations, and deductive inference to find provably optimal solutions.

---

### Q20. How does the Prolog AI generate the solution step-by-step?
**Answer:**  
Prolog evaluates the query `?- solve_hanoi(N, Moves)`. Through term unification, it instantiates variables `From=a`, `To=c`, and `Aux=b`. It decomposes the goal into subgoals, executes the base cases when $N=1$, and binds the output variable `Moves` to a list of structured terms:
```prolog
[move(a,c,1), move(a,b,2), move(c,b,1), move(a,c,3), ...]
```
This list is the complete, provably optimal plan for the agent.
