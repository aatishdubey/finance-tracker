const express = require("express");
const authenticateToken = require("./functions/auth");
const cors = require("cors");
const admin = require("./firebase");
const db = admin.firestore();

const app = express();
const port = 3000;


app.use(express.json());
app.use(
  cors({
    origin: [
      "http://127.0.0.1:5173",
      "http://127.0.0.1:5174",
      "http://localhost:5174/",
      "http://localhost:5173/",
      "https://finance-tracker-fe.onrender.com/",
    ],
  })
);

// Get all earnings
app.get("/earnings", authenticateToken, (req, res) => {
  db.collection("earnings").where('userId', '==', req.user.uid)
    .get()
    .then((snapshot) => {
      const earnings = [];
      snapshot.forEach((doc) => {
        earnings.push({ id: doc.id, ...doc.data() });
      });
      res.json(earnings);
    })
    .catch((error) => {
      console.error("Error getting earnings:", error);
      res.status(500).send("Error getting earnings");
    });
});

// Add new earning data
app.post("/earnings", authenticateToken, (req, res) => {
  const earningsData = req.body;

  earningsData.userId = req.user.uid;

  db.collection('earnings').add(earningsData)
    .then(() => {
      res.status(201).send('Earnings document created');
    })
    .catch((error) => {
      console.error('Error creating earnings document:', error);
      res.status(500).send('Error creating earnings document');
    });
})

// Get all expenses
app.get("/expenses", authenticateToken, (req, res) => {
  db.collection("expenses").where('userId', '==', req.user.uid)
    .get()
    .then((snapshot) => {
      const expenses = [];
      snapshot.forEach((doc) => {
        expenses.push({ id: doc.id, ...doc.data() });
      });
      res.json(expenses);
    })
    .catch((error) => {
      console.error("Error getting earnings:", error);
      res.status(500).send("Error getting earnings");
    });
});

// Add new expense data
app.post("/expenses", authenticateToken, (req, res) => {
  const expensesData = req.body;

  expensesData.userId = req.user.uid;

  db.collection('expenses').add(expensesData)
    .then(() => {
      res.status(201).send('Expense document created');
    })
    .catch((error) => {
      console.error('Error creating expense document:', error);
      res.status(500).send('Error creating expense document');
    });
})

// Get all savings
app.get("/savings", authenticateToken, (req, res) => {
  db.collection("savings").where('userId', '==', req.user.uid)
    .get()
    .then((snapshot) => {
      const savings = [];
      snapshot.forEach((doc) => {
        savings.push({ id: doc.id, ...doc.data() });
      });
      res.json(savings);
    })
    .catch((error) => {
      console.error("Error getting savings:", error);
      res.status(500).send("Error getting savings");
    });
});

// Add new savings data
app.post("/savings", authenticateToken, (req, res) => {
  const savingData = req.body;

  savingData.userId = req.user.uid;

  db.collection('savings').add(savingData)
    .then(() => {
      res.status(201).send('Saving document created');
    })
    .catch((error) => {
      console.error('Error creating saving document:', error);
      res.status(500).send('Error creating saving document');
    });
})

// Get user's budget
app.get("/budgets", authenticateToken, (req, res) => {
  db.collection("budgets").where('userId', '==', req.user.uid)
    .get()
    .then((snapshot) => {
      if(snapshot.empty) {
        throw new Error("Failed to fetch budget.");
      }
      snapshot.forEach((doc) => {
        res.json({ id: doc.id, ...doc.data() });
      });
    })
    .catch((error) => {
      console.error("Error getting budget:", error);
      res.status(500).send("Error getting budget");
    });
});

// Add new budget data
app.post("/budgets", authenticateToken, (req, res) => {
  const budgetData = req.body;

  budgetData.userId = req.user.uid;

  db.collection("budgets").where('userId', '==', req.user.uid)
    .get()
    .then((snapshot) => {
      if(snapshot.empty){
        db.collection('budgets').add(budgetData)
          .then(() => {
            res.status(201).send('Budget document created');
          })
          .catch((error) => {
            console.error('Error creating budget document:', error);
            res.status(500).send('Error creating budget document');
          });
      } else {
        snapshot.forEach(doc => {
          doc.ref.update(budgetData).then(() => {
            res.status(201).send('Budget document updated');
          }).catch((error) => {
            console.error('Error updating budget document:', error);
            res.status(500).send('Error updating budget document');
          });
        })
      }
    })
    .catch((error) => {
      console.error("Error getting budget:", error);
      res.status(500).send("Error getting budget");
    });
})

// Get all investments
app.get("/investments", authenticateToken, (req, res) => {
  db.collection("investments").where('userId', '==', req.user.uid)
    .get()
    .then((snapshot) => {
      const investments = [];
      snapshot.forEach((doc) => {
        investments.push({ id: doc.id, ...doc.data() });
      });
      res.json(investments);
    })
    .catch((error) => {
      console.error("Error getting investments:", error);
      res.status(500).send("Error getting investments");
    });
});

// Add new investments data
app.post("/investments", authenticateToken, (req, res) => {
  const investmentData = req.body;

  investmentData.userId = req.user.uid;

  db.collection('investments').add(investmentData)
    .then(() => {
      res.status(201).send('Investment document created');
    })
    .catch((error) => {
      console.error('Error creating investment document:', error);
      res.status(500).send('Error creating investment document');
    });
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
