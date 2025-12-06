import {Component} from '@angular/core';
import {AccordionModule} from 'primeng/accordion';
import {ToggleButtonModule} from 'primeng/togglebutton';
import {FormsModule} from '@angular/forms';
import {ButtonModule} from 'primeng/button';
import {TabsModule} from 'primeng/tabs';
import {QuizComponent} from '../../shared/quiz-template/quiz-template';
import {LatexContainer} from '../../shared/components/latex-container/latex-container';
import {NgOptimizedImage} from '@angular/common';
import {UnitTestConfig, UnitTestTemplate} from '../../shared/unit-test-template/unit-test-template';

// interface for quiz question
interface Question {
  text: string;
  options: string[];
  correct: string;
  explanation?: string;
}

@Component({
  selector: 'app-graph-theory-page',
  imports: [AccordionModule, ToggleButtonModule, FormsModule, ButtonModule, TabsModule, QuizComponent, LatexContainer, NgOptimizedImage, UnitTestTemplate],
  templateUrl: './graph-theory-page.html',
  styleUrl: './graph-theory-page.css'
})
export class GraphTheoryPage {

  activeTabs: string[] = [];
  activeTab = '0';
  isExpanded = false;

  /* Quiz questions and answers */
  graphTheoryQuestionPool: Question[] = [
    {
      text: 'Which of the following best describes a graph?',
      options: [
        'A set of numbers with arithmetic operations',
        'A collection of vertices and edges connecting them',
        'A sequence of increasing integers',
        'A tree with leaves only'
      ],
      correct: 'A collection of vertices and edges connecting them',
      explanation: 'A graph consists of vertices (nodes) and edges (connections).'
    },
    {
      text: 'What do vertices in a graph represent?',
      options: [
        'Connections between nodes',
        'Points or nodes in a graph',
        'The length of edges',
        'The shortest path'
      ],
      correct: 'Points or nodes in a graph',
      explanation: 'Vertices (also called nodes) are the main points in a graph.'
    },
    {
      text: 'What do edges in a graph represent?',
      options: [
        'Points or nodes',
        'Connections between vertices',
        'The degree of a vertex',
        'The root of a tree'
      ],
      correct: 'Connections between vertices',
      explanation: 'Edges connect two vertices and represent relationships between them.'
    },
    {
      text: 'Which of the following is an example of a graph in real life?',
      options: [
        'A shopping list',
        'A social network',
        'A paragraph of text',
        'A single number'
      ],
      correct: 'A social network',
      explanation: 'Graphs can represent networks such as social media connections.'
    },
    {
      text: 'Which graph type has edges with arrows indicating direction?',
      options: [
        'Undirected graph',
        'Directed graph',
        'Complete graph',
        'Tree'
      ],
      correct: 'Directed graph',
      explanation: 'Directed graphs have edges that point from one vertex to another.'
    },
    {
      text: 'Which graph type has all edges treated equally?',
      options: [
        'Weighted graph',
        'Unweighted graph',
        'Directed graph',
        'Tree'
      ],
      correct: 'Unweighted graph',
      explanation: 'Unweighted graphs treat all edges equally, without numerical weights.'
    },
    {
      text: 'Which graph type connects every pair of vertices?',
      options: [
        'Simple graph',
        'Complete graph',
        'Bipartite graph',
        'Tree'
      ],
      correct: 'Complete graph',
      explanation: 'A complete graph has an edge between every pair of vertices.'
    },
    {
      text: 'In a bipartite graph, vertices are divided into how many sets?',
      options: ['One', 'Two', 'Three', 'Four'],
      correct: 'Two',
      explanation: 'Bipartite graphs split vertices into two sets, with edges only between sets.'
    },
    {
      text: 'Which of these is a graph with no cycles?',
      options: ['Tree', 'Cycle graph', 'Complete graph', 'Directed graph'],
      correct: 'Tree',
      explanation: 'Trees are connected graphs without cycles.'
    },
    {
      text: 'Which algorithm can find the shortest path in an unweighted graph?',
      options: ['DFS', 'BFS', 'Dijkstra', 'Prim'],
      correct: 'BFS',
      explanation: 'Breadth-First Search (BFS) finds shortest paths in unweighted graphs.'
    },
    {
      text: 'Which algorithm finds the shortest path in a weighted graph?',
      options: ['DFS', 'BFS', 'Dijkstra', 'Prim'],
      correct: 'Dijkstra',
      explanation: 'Dijkstra\'s algorithm computes shortest paths in weighted graphs.'
    },
    {
      text: 'Which of these is a simple graph?',
      options: [
        'A graph with loops or multiple edges',
        'A graph with no loops or multiple edges',
        'A graph with directed edges only',
        'A graph with weighted edges'
      ],
      correct: 'A graph with no loops or multiple edges',
      explanation: 'Simple graphs do not have loops or multiple edges between vertices.'
    },
    {
      text: 'Which of these graphs can represent a tree structure?',
      options: [
        'A connected, acyclic graph',
        'A complete graph',
        'A directed cycle',
        'A weighted graph with cycles'
      ],
      correct: 'A connected, acyclic graph',
      explanation: 'A tree is a connected graph without cycles.'
    },
    {
      text: 'Which real-life example can be represented by a weighted graph?',
      options: [
        'Friendship connections',
        'Distances between cities',
        'A list of numbers',
        'A paragraph of text'
      ],
      correct: 'Distances between cities',
      explanation: 'Weighted graphs assign costs or distances to edges.'
    },
    {
      text: 'What is the degree of a vertex?',
      options: [
        'The number of edges connected to it',
        'The distance to the root',
        'The sum of edge weights',
        'The number of vertices in the graph'
      ],
      correct: 'The number of edges connected to it',
      explanation: 'The degree counts how many edges are incident to a vertex.'
    }
  ];

  graphTheoryUnitTestConfig: UnitTestConfig = {
    title: 'Graph Theory Unit Test',
    description: 'Test your knowledge of graph types, properties, and basic algorithms.',
    passingScore: 70,
    timeLimit: 30,
    questions: [
      // Easy Questions (10 total)
      {
        question: 'Which of the following best describes a graph?',
        options: [
          'A set of numbers with arithmetic operations',
          'A collection of vertices and edges connecting them',
          'A sequence of increasing integers',
          'A tree with leaves only'
        ],
        correctAnswer: 1,
        explanation: 'A graph consists of vertices (nodes) and edges (connections).',
        difficulty: 'easy'
      },
      {
        question: 'What do vertices in a graph represent?',
        options: [
          'Connections between nodes',
          'Points or nodes in a graph',
          'The length of edges',
          'The shortest path'
        ],
        correctAnswer: 1,
        explanation: 'Vertices (also called nodes) are the main points in a graph.',
        difficulty: 'easy'
      },
      {
        question: 'What do edges in a graph represent?',
        options: [
          'Points or nodes',
          'Connections between vertices',
          'The degree of a vertex',
          'The root of a tree'
        ],
        correctAnswer: 1,
        explanation: 'Edges connect two vertices and represent relationships between them.',
        difficulty: 'easy'
      },
      {
        question: 'Which graph type has edges with arrows indicating direction?',
        options: [
          'Undirected graph',
          'Directed graph',
          'Complete graph',
          'Tree'
        ],
        correctAnswer: 1,
        explanation: 'Directed graphs have edges that point from one vertex to another.',
        difficulty: 'easy'
      },
      {
        question: 'Which graph type has all edges treated equally?',
        options: [
          'Weighted graph',
          'Unweighted graph',
          'Directed graph',
          'Tree'
        ],
        correctAnswer: 1,
        explanation: 'Unweighted graphs treat all edges equally, without numerical weights.',
        difficulty: 'easy'
      },
      {
        question: 'Which graph type connects every pair of vertices?',
        options: [
          'Simple graph',
          'Complete graph',
          'Bipartite graph',
          'Tree'
        ],
        correctAnswer: 1,
        explanation: 'A complete graph has an edge between every pair of vertices.',
        difficulty: 'easy'
      },
      {
        question: 'In a bipartite graph, vertices are divided into how many sets?',
        options: ['One', 'Two', 'Three', 'Four'],
        correctAnswer: 1,
        explanation: 'Bipartite graphs split vertices into two sets, with edges only between sets.',
        difficulty: 'easy'
      },
      {
        question: 'Which of these is a graph with no cycles?',
        options: ['Tree', 'Cycle graph', 'Complete graph', 'Directed graph'],
        correctAnswer: 0,
        explanation: 'Trees are connected graphs without cycles.',
        difficulty: 'easy'
      },
      {
        question: 'Which algorithm can find the shortest path in an unweighted graph?',
        options: ['DFS', 'BFS', 'Dijkstra', 'Prim'],
        correctAnswer: 1,
        explanation: 'Breadth-First Search (BFS) finds shortest paths in unweighted graphs.',
        difficulty: 'easy'
      },
      {
        question: 'What is the degree of a vertex?',
        options: [
          'The number of edges connected to it',
          'The distance to the root',
          'The sum of edge weights',
          'The number of vertices in the graph'
        ],
        correctAnswer: 0,
        explanation: 'The degree counts how many edges are incident to a vertex.',
        difficulty: 'easy'
      },

      // Hard Questions (10 total)
      {
        question: 'Which of the following statements about a tree is true?',
        options: [
          'A tree can have cycles',
          'A tree is connected and acyclic',
          'A tree always has weighted edges',
          'A tree has exactly two root nodes'
        ],
        correctAnswer: 1,
        explanation: 'A tree is defined as a connected graph with no cycles.',
        difficulty: 'hard'
      },
      {
        question: 'In a weighted graph, which algorithm from the lessons can find the shortest path from a source?',
        options: [
          'DFS',
          'BFS',
          'Dijkstra\'s Algorithm',
          'Topological Sort'
        ],
        correctAnswer: 2,
        explanation: 'Dijkstra\'s algorithm finds the shortest paths from a source in weighted graphs with non-negative edges.',
        difficulty: 'hard'
      },
      {
        question: 'Which type of graph has edges with arrows indicating direction?',
        options: [
          'Undirected graph',
          'Weighted graph',
          'Directed graph',
          'Complete graph'
        ],
        correctAnswer: 2,
        explanation: 'Directed graphs have edges with arrows to show one-way relationships.',
        difficulty: 'hard'
      },
      {
        question: 'In a breadth-first search, when is a vertex first reached?',
        options: [
          'Via the longest path in edges',
          'Via a randomly chosen path',
          'Via the shortest path in number of edges',
          'DFS guarantees the shortest path'
        ],
        correctAnswer: 2,
        explanation: 'BFS explores level by level, so the first time a vertex is reached, it is via the fewest edges possible.',
        difficulty: 'hard'
      },
      {
        question: 'Which of the following is true about bipartite graphs?',
        options: [
          'Edges can connect vertices within the same set',
          'Vertices are divided into two sets with edges only between sets',
          'They always contain cycles',
          'They always contain a root node'
        ],
        correctAnswer: 1,
        explanation: 'Bipartite graphs have two sets of vertices, and edges only go between these sets.',
        difficulty: 'hard'
      },
      {
        question: 'DFS can be implemented using which of the following?',
        options: [
          'Queue',
          'Stack or recursion',
          'Priority Queue',
          'Adjacency matrix only'
        ],
        correctAnswer: 1,
        explanation: 'DFS explores deeply using a stack (explicit) or recursion (implicit stack).',
        difficulty: 'hard'
      },
      {
        question: 'Which statement is true about a complete graph?',
        options: [
          'No vertices are connected',
          'Every vertex is connected to every other vertex',
          'It must have weighted edges',
          'It is always a tree'
        ],
        correctAnswer: 1,
        explanation: 'By definition, complete graphs have edges between all pairs of vertices.',
        difficulty: 'hard'
      },
      {
        question: 'In BFS, which data structure is used to track vertices to visit next?',
        options: [
          'Stack',
          'Queue',
          'Hash Table',
          'Set'
        ],
        correctAnswer: 1,
        explanation: 'BFS uses a queue to explore vertices level by level.',
        difficulty: 'hard'
      },
      {
        question: 'Which of the following is a weighted graph?',
        options: [
          'A graph where all edges are treated equally',
          'A graph with costs or lengths assigned to edges',
          'A graph with no edges',
          'A tree with a root node'
        ],
        correctAnswer: 1,
        explanation: 'Weighted graphs assign a value to each edge representing cost, distance, or weight.',
        difficulty: 'hard'
      },
      {
        question: 'Which algorithm explores as far as possible along each branch before backtracking?',
        options: [
          'Breadth-First Search',
          'Dijkstra\'s Algorithm',
          'Depth-First Search',
          'Topological Sort'
        ],
        correctAnswer: 2,
        explanation: 'DFS explores a branch deeply before moving to another branch.',
        difficulty: 'hard'
      }
    ]
  };

  toggleAll() {
    if (this.isExpanded) {
      this.collapseAll();
    } else {
      this.expandAll();
    }
    this.isExpanded = !this.isExpanded;
  }

  expandAll() {
    this.activeTabs = ['0', '1', '2', '3', '4', '5', '6'];
  }

  collapseAll() {
    this.activeTabs = [];
  }
}
