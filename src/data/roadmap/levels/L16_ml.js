// src/data/roadmap/levels/L16_ml.js
export const machineLearningLevel = {
  id: 'L16',
  title: 'Machine Learning',
  shortTitle: 'Machine Learning',
  description: 'Classical ML algorithms, sklearn, and feature engineering.',
  domain: 'AI / ML',
  color: 'purple',
  colorClass: 'bg-purple-500',
  textClass: 'text-purple-700',
  bgClass: 'bg-purple-50',
  borderClass: 'border-purple-200',
  subjects: [
    {
      id: 'ml-fundamentals',
      title: 'ML Fundamentals',
      description: 'Core concepts of machine learning',
      topics: [
        {
          id: 'ml-supervised',
          title: 'Supervised Learning',
          description: 'Classification and regression algorithms',
          priority: 'core',
          tags: ['ml', 'supervised', 'sklearn'],
          estimatedHours: 15,
          whatToLearn: [
            { id: 'c1', title: 'Bias-variance tradeoff' },
            { id: 'c2', title: 'Linear Regression' },
            { id: 'c3', title: 'Logistic Regression' },
            { id: 'c4', title: 'Decision Trees and Random Forests' },
            { id: 'c5', title: 'SVM (Support Vector Machines)' },
            { id: 'c6', title: 'k-NN' },
            { id: 'c7', title: 'Cross-validation and overfitting' },
            { id: 'c8', title: 'Evaluation metrics (accuracy, F1, AUC)' },
          ],
          practice: [
            { id: 'p1', title: 'Classification pipeline', description: 'Build a complete sklearn classification pipeline', difficulty: 'medium' },
            { id: 'p2', title: 'Feature importance analysis', description: 'Analyze which features matter most in a dataset', difficulty: 'medium' },
          ],
          interviewQuestions: [
            { id: 'iq1', question: 'Explain bias-variance tradeoff.', difficulty: 'medium' },
            { id: 'iq2', question: 'When would you use Random Forest over Logistic Regression?', difficulty: 'medium' },
            { id: 'iq3', question: 'What is cross-validation and why is it important?', difficulty: 'easy' },
          ],
          resources: [],
        },
        {
          id: 'ml-unsupervised',
          title: 'Unsupervised Learning',
          description: 'Clustering, dimensionality reduction',
          priority: 'important',
          tags: ['ml', 'clustering', 'pca'],
          estimatedHours: 10,
          whatToLearn: [
            { id: 'c1', title: 'k-Means clustering' },
            { id: 'c2', title: 'DBSCAN' },
            { id: 'c3', title: 'PCA (Principal Component Analysis)' },
            { id: 'c4', title: 't-SNE for visualization' },
            { id: 'c5', title: 'Autoencoders' },
          ],
          practice: [
            { id: 'p1', title: 'Customer segmentation', description: 'Cluster customers using k-Means', difficulty: 'medium' },
          ],
          interviewQuestions: [
            { id: 'iq1', question: 'Explain PCA and when you would use it.', difficulty: 'medium' },
          ],
          resources: [],
        },
      ],
    },
  ],
};
