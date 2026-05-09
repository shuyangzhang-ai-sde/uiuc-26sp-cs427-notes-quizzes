Question 1. Which concept below expresses the overall size of a work item but is unitless and denotes only relative values?

* (a) Ideal time
* (b) Velocity
* (c) Elapsed time
* (d) Story point ✅

Question 2. Lesson 2.7 discussed the biggest risks in software projects. Is the following statement true or false? "Risk management is an evaluation of the current software product to identify potential faults."

* (a) False ✅
* (b) True

Question 3. In Extreme Programming (XP), each iteration is organized as a two-week cycle. What activity takes place at the start of each iteration?

* (a) The team changes all pair programming assignments for the next two weeks.
* (b) All tests from the previous iteration are deleted and rewritten.
* (c) An iteration planning meeting is held to plan the work for that iteration.
* (d) The customer writes all new user stories for the entire project.

Question 4. The following requirement is a __________ requirement. "Reliability estimations must take no longer than 2.5 seconds to complete and display results."

* (a) Non-functional
* (b) Functional

Question 5. Security requirements are often stated as ___________ requirements.

* (a) Non-functional
* (b) Functional

Question 6. Which of the following is NOT a correct statement on software design?

* (a) It is desirable to have low cohesion ✅
* (b) It is desirable to have information hiding
* (c) It is desirable to have high modularity
* (d) It is desirable to have low coupling

Question 7. Which of the following is the least desirable type of module cohesion among the following options?

* (a) Communicational cohesion
* (b) Coincidental cohesion ✅
* (c) Functional cohesion
* (d) Procedural cohesion

Question 8. Is the following statement true or false? "A sequence diagram has no way to represent conditional logic."

* (a) False ✅
* (b) True

Question 9. In the pipe-and-filter architectural style, which of the following is true?

* (a) Filters are independent and process data incrementally as it arrives. ✅
* (b) Filters must know about upstream and downstream filters.
* (c) Filters share state with each other.
* (d) Data flows bidirectionally between filters.

Question 10. Which of the following statements best captures the essence of when the Strategy pattern should be applied?

* (a) Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and the algorithm changes automatically.
* (b) Define a family of algorithms, encapsulate each one, and make them interchangeable so that the algorithm can vary independently from the clients that use it. ✅
* (c) Allows an object to alter its behavior when its internal state changes.
* (d) Encapsulate a request as an object, thereby letting you parameterize clients with different requests.

Question 11. A system currently uses the Interpreter pattern to evaluate expressions, with each class implementing its own interpret method. The development team wants to centralize the evaluation logic to make it easier to modify and extend operations without changing existing element classes. Which pattern should be used?

* (a) Visitor pattern ✅
* (b) Observer pattern
* (c) Composite pattern
* (d) Strategy pattern

Question 12. __________ test cases should be written without knowledge of code structure. It is advisable that these test cases __________ written by the original programmer.

* (a) White box, are not
* (b) Black box, are not ✅
* (c) Black box, are
* (d) White box, are

Question 13. Which type of testing between the two below is more effective in detecting missing-logic fault?

* (a) Black-box testing ✅
* (b) White-box testing

Question 14. Consider a program in which all predicates are simple — that is, each predicate consists of only a single condition, with no logical operators such as && or ||. Is the following statement true or false? "For a program in which all predicates are simple, condition coverage and branch coverage will always have same metric values when using the same test suite."

* (a) False
* (b) True ✅

Question 15. Which one of the following equations is NOT a valid property for the following `IntSet` class that represents a Set's common behavior (as discussed in our lecture video/slides on parameterized unit tests)?

```java
class IntSet {
  public IntSet() { ... }
  public void insert(int e) { ... }
  public boolean member(int e) { ... }
  public void remove(int e) { ... }
  public boolean equals(IntSet o) { ... }
}
```

Note that in the methods presented in the following equations (i.e., insert, member, remove, equals), the first argument represents the receiver object. The state of the receiver object after executing the method `m` is denoted as `m.state`, while the return value of the method `m` is represented as `m.ret`.

* (a) `Foreach int i, int j, IntSet s: s !=null => member(IntSet().ret, i).ret == false`
* (b) `Foreach int i, int j, IntSet s: s !=null => member(remove(s, i).state, i).ret == false`
* (c) `Foreach int i, int j, IntSet s: s !=null => member(insert(s, i).state, i).ret == true`
* (d) `Foreach int i, int j, IntSet s: s !=null => member(insert(s, j).state, i).ret == member(s, i).ret` ✅

Question 16. In JUnit, why is it important to initialize test data separately for each test method?

* (a) To ensure tests do not depend on shared state from previous executions. ✅
* (b) To improve performance by reducing repeated setup operations.
* (c) To allow test methods to share objects created during earlier tests.
* (d) To guarantee tests execute in a specific order.

Question 17. Consider the following program that uses binary search to check whether the input array (assumed to be sorted in non-descending order) contains a specific input value; Find out all the buggy line(s). Select all possible options that apply.

```java
public class BinarySearch {                             // 1
    public boolean contains(int[] a, int b) {           // 2
        int low = 0;                                    // 3
        int high = a.length - 1;                        // 4
        while (low <= high) {                           // 5
            int middle = (low + high - 1) / 2;          // 6
            if (b >= a[middle]) {                       // 7
                low = middle + 1;                       // 8
            } else if (b < a[middle]) {                 // 9
                high = middle - 1;                      // 10
            } else {                                    // 11
                return true;                            // 12
            }                                           // 13
        }                                               // 14
        return false;                                   // 15
    }                                                   // 16
}                                                       // 17
```

* (a) Line 6: `int middle = (low + high - 1) / 2;` ✅
* (b) Line 7: `if (b >= a[middle]) {` ✅
* (c) Line 8: `low = middle + 1;`
* (d) Line 9: `} else if (b < a[middle]) {`
* (e) Line 10: `high = middle - 1;`
* (f) Line 12: `return true`

Question 18. Consider the following code for deserializing a BinaryTree, e.g., `[1,null,null]` denotes a tree with only a root node of value 1 with no children. Which of the following tests will cover the true branch of line 19 in method `deserializeRec`, i.e., `if (level.size() == 0) return;`. Select all possible options that apply.

```java
class BinaryTreeDeserializer {                                          // 1
    public TreeNode deserialize(String data) {                          // 2
        //check if data is valid                                        // 3
        if (data.length() < 3) return null;                             // 4
        //remove "[" and "]"                                            // 5
        data = data.substring(1, data.length() - 1);                    // 6
        //separate to parts                                             // 7
        String[] parts = data.split(",");                               // 8
        List<TreeNode> level = new ArrayList<TreeNode>();               // 9
        TreeNode node = getNode(parts[0]);                              // 10
        if (node != null) {                                             // 11
            level.add(node);                                            // 12
            deserializeRec(parts, 1, level);                            // 13
        }                                                               // 14
        return node;                                                    // 15
    }                                                                   // 16
    private void deserializeRec(String[] parts, int i, List<TreeNode> level) { // 17
        if (i >= parts.length) return;                                  // 18
        if (level.size() == 0) return;                                  // 19
        List<TreeNode> nextLevel = new ArrayList<TreeNode>();           // 20
        for (TreeNode n : level) {                                      // 21
            n.left = getNode(parts[i++]);                               // 22
            n.right = getNode(parts[i++]);                              // 23
            if (n.left != null) nextLevel.add(n.left);                  // 24
            if (n.right != null) nextLevel.add(n.right);                // 25
        }                                                               // 26
        deserializeRec(parts, i, nextLevel);                            // 27
    }                                                                   // 28
    private TreeNode getNode(String s) {                                // 29
        if (s.charAt(0) == 'n') return null;                            // 30
        return new TreeNode(Integer.parseInt(s));                       // 31
    }                                                                   // 32
    ...                                                                 // 33
}                                                                       // 34
```

* (a) `[1,1,1,null,null,null,null]`
* (b) `[1,1,1,null,null,null,null,null,null]` ✅
* (c) `[1,null,null]`
* (d) `[1,null,null,null,null]` ✅

Question 19. Consider the following program for finding the median of the three input parameters; Find out the buggy line(s). Select all possible options that apply.

```java
public class TestMe {                        // 1
    public int mid(int x, int y, int z) {   // 2
        int m = z;                           // 3
        if (y < z) {                         // 4
            if (x < y)                       // 5
                m = x;                       // 6
            else if (x < z)                  // 7
                m = y;                       // 8
        } else {                             // 9
            if (x > y)                       // 10
                m = y;                       // 11
            else if (x > z)                  // 12
                m = x;                       // 13
        }                                    // 14
        return m;                            // 15
    }                                        // 16
}                                            // 17
```

* (a) Line 6: `m=x;`
* (b) Line 8: `m=y;`
* (c) Line 11: `m=y;`
* (d) Line 13: `m=x;`

Question 20. Which one of the following is least likely to be a key element in tracking/reproducing a problem?

* (a) Change multiple variables that may alter symptoms at the same time to speed up the debugging process ✅
* (b) Check the reproducibility of the failure as part of writing a problem report
* (c) Document a crisp sequence of actions that will reproduce the failure
* (d) Look for related failures in the software under test

Question 21. In delta debugging for failing-input simplification, what happens when both halves of a failing input produce passing results?

* (a) The original input is returned as the minimum failing input.
* (b) The granularity of changes is refined to produce more, smaller alternatives. ✅
* (c) The process switches to binary search.
* (d) The process terminates with no result.

Question 22. Which of the following is NOT a class invariant for the class below?

```java
class ValueRange {
    private int lower = Math.minInt();
    private int upper = Math.maxInt();

    void setLower(int i) { if (i < upper) lower = i; }
    void setUpper(int i) { if (i > lower) upper = i; }
}
```

* (a) `Math.minInt() < upper`
* (b) `lower < upper`
* (c) `upper < Math.maxInt()` ✅
* (d) `lower < Math.maxInt()`

Question 23. Consider the following code snippet. Please select all the code smells that would generate a warning for this code. Select all possible options that apply.

```java
import Components.Restaurant;
import Components.SeatingSystem;
import Entities.*;
import Terminals.KitchenTerminal;
import java.util.ArrayList;
import java.util.List;

public class ServiceDeskTerminal extends Terminal {

    private List<SingleTable> tables;

    public ServiceDeskTerminal() {
        super();
        tables = new ArrayList<SingleTable>();
    }

    public CustomerTerminal checkIn(int numberOfPeople) {
        Restaurant re = Restaurant.getInstance();
        SeatingSystem ss = re.getSeatingSystem();
        SingleTable table = ss.getAvailableTable(numberOfPeople);
        if (table != null) {
            if (ss.occupy(table)) {
                tables.add(table);
                printToScreen("New table " + table.getIndex() + " checked in, number of people: " + numberOfPeople);
                return new CustomerTerminal(table);
            } else {
                printToScreen("Table " + table.getIndex() + " occupied. Check in failed.", TerminalPrintType.ERROR);
                return null;
            }
        } else {
            printToScreen("Not enough seat", TerminalPrintType.Error);
            return null;
        }
    }
}
```

* (a) JavadocMethod: Checks the Javadoc of a method or constructor. ✅
* (b) MultipleVariableDeclarationsCheck: Checks that each variable declaration is in its own statement and on its own line.
* (c) ReturnCountCheck: One method should have only one return statement. ✅
* (d) AvoidStarImportCheck: Checks that there are no import statements that use the * notation. ✅
* (e) MultipleStringLiteralsCheck: Checks for multiple occurrences of the same string literal within a single file.

Question 24. The code smell 'feature envy' refers to code portions that seem to belong in another class. Which refactoring is most appropriate to address it?

* (a) Introduce Parameter Object
* (b) Move Method ✅
* (c) Extract Method
* (d) Extract Variable

Question 25. The Depth of Inheritance Tree (DIT) metric measures the number of ancestor classes from a class to the root of the hierarchy. Which of the following is a stated implication of a higher DIT value related to system behavior?

* (a) The class reuses fewer methods from its ancestors.
* (b) The class requires fewer methods to be implemented.
* (c) The class has fewer subclasses in the hierarchy.
* (d) The class is harder to predict in its behavior due to inherited methods. ✅
