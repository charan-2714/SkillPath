// src/data/roadmap/levels/L17_dl.js
export const deepLearningLevel = {
  id: 'L17',
  title: 'Deep Learning',
  shortTitle: 'Deep Learning',
  description: 'Neural networks, PyTorch, and modern deep learning.',
  domain: 'AI / ML',
  color: 'pink',
  colorClass: 'bg-pink-500',
  textClass: 'text-pink-700',
  bgClass: 'bg-pink-50',
  borderClass: 'border-pink-200',
  subjects: [
    {
      id: 'dl-fundamentals',
      title: 'Neural Network Fundamentals',
      description: 'Neurons, layers, backpropagation',
      topics: [
        {
          id: 'dl-neural-networks',
          title: 'Neural Networks',
          description: 'Perceptrons, MLPs, activation functions, backpropagation',
          priority: 'core',
          tags: ['deep learning', 'neural networks', 'pytorch'],
          estimatedHours: 15,
          whatToLearn: [
            { id: 'c1', title: 'Perceptron and MLP' },
            { id: 'c2', title: 'Activation functions (ReLU, sigmoid, tanh)' },
            { id: 'c3', title: 'Forward pass' },
            { id: 'c4', title: 'Backpropagation and gradient descent' },
            { id: 'c5', title: 'Loss functions' },
            { id: 'c6', title: 'Optimizers (SGD, Adam)' },
            { id: 'c7', title: 'Batch normalization and dropout' },
          ],
          practice: [
            { id: 'p1', title: 'MNIST classifier', description: 'Build an MNIST digit classifier with PyTorch', difficulty: 'medium' },
          ],
          interviewQuestions: [
            { id: 'iq1', question: 'Explain backpropagation in simple terms.', difficulty: 'hard' },
            { id: 'iq2', question: 'What is the vanishing gradient problem?', difficulty: 'hard' },
          ],
          resources: [],
        },
        {
          id: 'dl-cnns',
          title: 'Convolutional Neural Networks',
          description: 'CNNs for image recognition and computer vision',
          priority: 'important',
          tags: ['deep learning', 'cnn', 'computer vision'],
          estimatedHours: 12,
          whatToLearn: [
            { id: 'c1', title: 'Convolution operation' },
            { id: 'c2', title: 'Pooling layers' },
            { id: 'c3', title: 'ResNet, VGG architectures' },
            { id: 'c4', title: 'Transfer learning' },
            { id: 'c5', title: 'Image augmentation' },
          ],
          practice: [
            { id: 'p1', title: 'Image classifier', description: 'Fine-tune ResNet for custom image classification', difficulty: 'hard' },
          ],
          interviewQuestions: [
            { id: 'iq1', question: 'What is transfer learning and why is it powerful?', difficulty: 'medium' },
          ],
          resources: [],
        },
      ],
    },
  ],
};
