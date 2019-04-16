const Chapters = [
  {
    id: 1,
    title: "Algorithms",
    progress: 0,
    subChapters: [
      {
        id: 1,
        title: "Algorithmic Complexity / Big-O",
        tasks: [
          {
            id: 1,
            title: "Harvard CS50 - Asymptotic Notation (video)",
            url: "https://www.youtube.com/watch?v=iOq5kSKqeR4",
            subTasks: [],
            isCompleted: false
          },
          {
            id: 2,
            title: "Big O Notations (general quick tutorial) (video)",
            url: "https://www.youtube.com/watch?v=V6mKVRU1evU",
            subTasks: [],
            isCompleted: false
          }
        ]
      },
      {
        id: 2,
        title: "Data Structures",
        tasks: [
          {
            id: 1,
            title: "Implement an automatically resizing vector.",
            url: "",
            isCompleted: false,
            subTasks: [
              {
                id: 1,
                title: "Arrays (video)",
                url: "https://www.coursera.org/learn/data-structures/lecture/OsBSF/arrays",
                isCompleted: false
              },
              {
                id: 2,
                title: "UC Berkeley CS61B - Linear and Multi-Dim Arrays (video) (Start watching from 15m 32s)",
                url: "https://archive.org/details/ucberkeley_webcast_Wp8oiO_CZZE",
                isCompleted: false,
              }
            ]
          },
          {
            id: 2,
            title: "Big O Notations (general quick tutorial) (video)",
            url: "https://www.youtube.com/watch?v=V6mKVRU1evU",
            isCompleted: false,
            subTasks: []
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: "Architecture Design",
    progress: 0,
    subChapters: [
      {
        id: 1,
        title: "Design Patterns",
        tasks: [
          {
            id: 1,
            title: "Intro to Architecture and Systems, YouTube",
            url: "https://www.youtube.com/watch?v=ZgdS0EUmn70",
            subTasks: [],
            isCompleted: false
          },
          {
            id: 2,
            title: "Quick UML review (video)",
            url: "https://www.youtube.com/watch?v=3cmzqZzwNDM&list=PLGLfVvz_LVvQ5G-LdJ8RLqe-ndo7QITYc&index=3",
            isCompleted: false,
            subTasks: [
              {
                id: 1,
                title: "strategy",
                url: "",
                isCompleted: false
              },
              {
                id: 2,
                title: "singleton",
                url: "",
                isCompleted: false
              }
            ]
          }
        ]
      },
      {
        id: 2,
        title: "System Design, Scalability",
        tasks: [
          {
            id: 1,
            title: "The System Design Primer",
            url: "https://github.com/donnemartin/system-design-primer",
            subTasks: [],
            isCompleted: false
          },
          {
            id: 2,
            title: "https://github.com/donnemartin/system-design-primer",
            url: "http://www.hiredintech.com/system-design/",
            subTasks: [],
            isCompleted: false
          }
        ]
      }
    ]
  }
]

export default Chapters;